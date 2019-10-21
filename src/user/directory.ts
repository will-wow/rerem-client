import _ from "lodash";
import {
  okThen,
  error,
  ok,
  Result,
  ResultP,
  okChain,
  isError,
  isOk,
  resultToBoolean,
  either
} from "result-async";
import { pipeA } from "pipeout";
import { writable, get, derived } from "svelte/store";

import * as Note from "notes/note";
import * as AccessData from "notes/access-data";
import * as Crypto from "../crypto";

export type DirectoryData = {
  accessData: AccessData.T;
  directory: Directory;
};

export type Directory = {
  [id: string]: AccessData.T;
};

const DEFAULT_STATE = error("uninitialized");

/**
 * Holds the users directory
 */
export const store = writable<Result<DirectoryData, string>>(DEFAULT_STATE);

export const loggedIn = derived(store, resultToBoolean);

export const accessList = derived(store, data =>
  either(data, data => Object.values(data.directory), () => null)
);

export const directory = derived(store, data =>
  either(data, data => data.directory, () => ({}))
);

export const defaultServer = derived(store, data =>
  either(data, data => data.accessData.server, () => process.env.API)
);

export const credentials = derived(store, data =>
  either(
    data,
    data => ({
      id: data.accessData.id,
      access: AccessData.toEditAccessParam(data.accessData)
    }),
    () => null
  )
);

/** Create a new directory on the server */
export const signUp = async (
  server: string
): ResultP<DirectoryData, string> => {
  const accessData = await AccessData.generateKeys(server);

  return pipeA(Note.createNote({ body: "{}" }, accessData))
    .thru(okThen(({ id }) => storeDirectory({}, { ...accessData, id })))
    .value();
};

/** Load a directory, given new credentials */
export const logIn = (
  id: string,
  accessParam: Crypto.Encoded
): ResultP<DirectoryData, string> => {
  const accessData = AccessData.decodeAccessParams(accessParam, id);

  return pipeA(accessData)
    .thru(Note.fetchAndDecryptNote)
    .thru(okChain(noteToDirectory))
    .thru(okThen(x => storeDirectory(x, accessData)))
    .value();
};

export const logOut = () => {
  store.set(DEFAULT_STATE);
  localStorage.removeItem("rerem");
};

/** Load a directory, given saved credentials */
export const logInFromStorage = async (): ResultP<DirectoryData, string> => {
  const existingData: Result<DirectoryData, string> = get(store);
  if (isOk(existingData)) return existingData;

  const accessDataResult = loadAccessData();

  if (isError(accessDataResult)) return accessDataResult;
  const accessData = accessDataResult.ok;
  if (!AccessData.isValid(accessData)) return error("invalid");

  return pipeA(accessData)
    .thru(Note.fetchAndDecryptNote)
    .thru(okChain(noteToDirectory))
    .thru(okThen(x => storeDirectory(x, accessData)))
    .value();
};

/** Save a new note to the directory */
export const addNote = (accessData: AccessData.T): void => {
  const { id } = accessData;
  if (!id) return;

  store.update(
    okThen(data => {
      if (data.directory[id]) return data;
      const directory = { [id]: accessData, ...data.directory };

      const newData = {
        ...data,
        directory
      };

      // Save the new data, but don't wait for it
      Note.updateNote({ body: JSON.stringify(directory) }, data.accessData);

      // Update the store.
      return newData;
    })
  );
};

/** Remove a note from the directory */
export const removeNote = (accessData: AccessData.T): void => {
  const { id } = accessData;
  if (!id) return;

  store.update(
    okThen(data => {
      if (!data.directory[id]) return data;
      const directory = { ...data.directory };
      delete directory[id];

      const newData = {
        ...data,
        directory
      };

      // Save the new data, but don't wait for it
      Note.updateNote({ body: JSON.stringify(directory) }, data.accessData);

      // Update the store.
      return newData;
    })
  );
};

export const inDirectory = (id: string, directory: Directory): boolean =>
  Boolean(directory[id]);

export const differentFromDirectory = (
  accessData: AccessData.T,
  directory: Directory
): boolean => {
  if (!accessData.id) return false;
  return !_.isEqual(directory[accessData.id], accessData);
};

const noteToDirectory = (note: Note.T): Result<Directory, string> => {
  const result = parseJson<Directory>(note.body, "invalid directory");

  return okThen((directory: Directory) =>
    _.mapValues(directory, AccessData.upgradeAccessData)
  )(result);
};

const storeDirectory = (
  directory: Directory,
  accessData: AccessData.T
): DirectoryData => {
  const data: DirectoryData = {
    directory,
    accessData
  };

  persistAccessData(accessData);
  store.set(ok(data));
  return data;
};

const persistAccessData = (accessData: AccessData.T): void => {
  localStorage.setItem("rerem", JSON.stringify(accessData));
};

const loadAccessData = (): Result<AccessData.T, string> => {
  const data = localStorage.getItem("rerem");
  if (!data) return error("no access data");

  const accessData = parseJson<AccessData.T>(
    data,
    `invalid directory: ${data}`
  );
  return okThen(AccessData.upgradeAccessData)(accessData);
};

/**
 * Safely parse JSON
 * @param json - Stringified JSON to parse
 * @param errorMessage - Optional message to return. Otherwise will return the parser's error message.
 */
function parseJson<T, ErrorMessage = string>(
  json: string,
  errorMessage?: string
): Result<T, ErrorMessage> {
  try {
    return ok(JSON.parse(json));
  } catch (e) {
    return error(errorMessage || e.message);
  }
}
