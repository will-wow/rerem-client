import fp from "lodash/fp";
import * as Crypto from "../crypto";
import { renameKeysCurried } from "../dictionary";

export type T = NoteAccessData;

export interface NoteAccessData {
  id?: string;
  encryptionKey: Crypto.Encoded;
  viewKey: Crypto.Encoded;
  editKey?: Crypto.Encoded;
  server: string;
}

const SHORT_NAMES = {
  encryptionKey: "k",
  viewKey: "v",
  editKey: "e",
  server: "s"
};

export const generateKeys = async (server: string): Promise<NoteAccessData> => {
  const [viewKey, editKey, key] = await Promise.all([
    Crypto.createKey(),
    Crypto.createKey(),
    Crypto.createKey()
  ]);

  return {
    encryptionKey: key,
    viewKey,
    editKey,
    server
  };
};

export const toViewAccessParam = (accessData: NoteAccessData) => {
  return toAccessParam(accessData, ["id", "editKey"]);
};

export const toEditAccessParam = (accessData: NoteAccessData) => {
  return toAccessParam(accessData, ["id"]);
};

export const decodeAccessParams = (
  accessParam: string,
  id?: string
): NoteAccessData => {
  if (!id) throw new Error("can't decode without id");
  return fp.pipe(
    x => Crypto.decodeObject(x, true),
    renameKeysCurried(SHORT_NAMES, { invert: true }),
    (data: NoteAccessData) => ({ ...data, id: id } as NoteAccessData),
    upgradeAccessData
  )(accessParam);
};

export const isValid = (accessData: NoteAccessData): boolean => {
  return Boolean(accessData.id && accessData.server);
};

export const upgradeAccessData = (
  data: Partial<NoteAccessData>
): NoteAccessData => {
  if (!data.encryptionKey)
    throw new Error("Invalid Access Data, missing EncryptionKey");
  if (!data.viewKey) throw new Error("Invalid Access Data, missing ViewKey");

  return {
    id: data.id,
    encryptionKey: data.encryptionKey,
    viewKey: data.viewKey,
    editKey: data.editKey,

    server: data.server || process.env.API || ""
  };
};

const toAccessParam = (
  accessData: NoteAccessData,
  omitKeys: Array<keyof NoteAccessData>
) =>
  fp.pipe(
    fp.omit(omitKeys),
    renameKeysCurried(SHORT_NAMES),
    x => Crypto.encodeObject(x, true)
  )(accessData);

export const hasEditPermission = (accessData: NoteAccessData): boolean =>
  Boolean(accessData.editKey);
