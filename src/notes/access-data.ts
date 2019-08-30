import fp from "lodash/fp";
import * as Crypto from "../crypto";
import { renameKeysCurried } from "../dictionary";

export type T = NoteAccessData;

export interface NoteAccessData {
  // server: string;
  id?: string;
  encryptionKey: Crypto.Encoded;
  viewKey: Crypto.Encoded;
  editKey: Crypto.Encoded;
}

const SHORT_NAMES = {
  encryptionKey: "k",
  viewKey: "v",
  editKey: "e"
};

export const generateKeys = async (): Promise<NoteAccessData> => {
  const [viewKey, editKey, key] = await Promise.all([
    Crypto.createKey(),
    Crypto.createKey(),
    Crypto.createKey()
  ]);

  return {
    encryptionKey: key,
    viewKey,
    editKey
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
    (data: any) => ({ ...data, id: id } as NoteAccessData)
  )(accessParam);
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
