import fp from "lodash/fp";
import * as Crypto from "../crypto";
import { renameKeysCurried } from "../dictionary";

export type T = NoteAccessData;

export interface NoteAccessData {
  // server: string;
  id: string;
  decryptionKey: Crypto.Encoded;
  decryptionIv: Crypto.Encoded;
  viewKey: Crypto.Encoded;
  editKey: Crypto.Encoded;
}

const SHORT_NAMES = {
  decryptionKey: "k",
  decryptionIv: "i",
  viewKey: "v",
  editKey: "e"
};

export const toViewAccessParam = (accessData: NoteAccessData) => {
  return toAccessParam(accessData, ["id", "editKey"]);
};

export const toEditAccessParam = (accessData: NoteAccessData) => {
  return toAccessParam(accessData, ["id"]);
};

export const decodeAccessParams = (
  accessParam: string,
  id: string
): NoteAccessData =>
  fp.pipe(
    x => Crypto.decodeObject(x, true),
    renameKeysCurried(SHORT_NAMES, { invert: true }),
    (data: any) => ({ ...data, id: id } as NoteAccessData)
  )(accessParam);

const toAccessParam = (
  accessData: NoteAccessData,
  omitKeys: Array<keyof NoteAccessData>
) =>
  fp.pipe(
    fp.omit(omitKeys),
    renameKeysCurried(SHORT_NAMES),
    x => Crypto.encodeObject(x, true)
  )(accessData);
