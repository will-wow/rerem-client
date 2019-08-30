import _ from "lodash";
import fp from "lodash/fp";
import { ResultP, Result, allOkAsync, pipeAsync, okChain } from "result-async";
import * as Api from "../api";
import * as Crypto from "../crypto";
import * as AccessData from "./access-data";

interface Note {
  id?: string;
  body: string;
}

export type T = Note;

export interface NoteCreateRequest {
  body: Crypto.EncryptedString;
  iv: Crypto.Encoded;
  viewKeyHash: Crypto.Hash;
  editKeyHash: Crypto.Hash;
}

export interface NoteLookupRequest {
  viewKey: Crypto.Encoded;
  editKey: Crypto.Encoded;
}

export interface NoteResponse {
  id: string;
  body: Crypto.EncryptedString;
  iv: Crypto.Encoded;
}

const accessDataToRequest = (accessData: AccessData.T): NoteLookupRequest =>
  _.pick(accessData, ["viewKey", "editKey"]);

export const fetchNotes = (
  accessData: AccessData.T[]
): ResultP<Note[], string> =>
  pipeAsync(accessData, fp.map(fetchAndDecryptNote), allOkAsync);

export const fetchAndDecryptNote = (
  accessData: AccessData.T
): ResultP<Note, string> => {
  return pipeAsync(accessData, fetchNote, okChain(decryptNote(accessData)));
};

export const fetchNote = (
  accessData: AccessData.T
): ResultP<NoteResponse, string> =>
  Api.get<NoteResponse, string>(
    `/notes/${accessData.id}`,
    accessDataToRequest(accessData)
  );

export const createNote = async (
  note: Note,
  accessData: AccessData.T
): ResultP<NoteResponse, string> => {
  const { body: encrypted, iv } = await Crypto.encrypt(
    note.body,
    accessData.encryptionKey
  );

  const postBody = {
    body: encrypted,
    iv,
    viewKeyHash: await Crypto.hashKey(accessData.viewKey),
    editKeyHash: await Crypto.hashKey(accessData.editKey)
  };

  return Api.post(`/notes`, postBody);
};

export const updateNote = async (
  body: Note,
  accessData: AccessData.T
): ResultP<NoteResponse, string> => {
  const { body: encrypted, iv } = await Crypto.encrypt(
    note.body,
    accessData.encryptionKey
  );

  return Api.put(`/notes/${accessData.id}`, {
    body: encrypted,
    iv,
    ...accessDataToRequest(accessData)
  });
};

const decryptNote = (accessData: AccessData.T) => (
  noteResponse: NoteResponse
): Result<Note, string> => {
  const result = Crypto.decrypt(noteResponse, accessData.encryptionKey);

  return result.map((body: string) => ({
    id: noteResponse.id,
    body
  }));
};
