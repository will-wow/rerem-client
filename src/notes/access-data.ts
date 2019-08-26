import _ from "lodash";
import * as Crypto from "../crypto";

export type T = NoteAccessData;

export interface NoteAccessData {
  // server: string;
  id: string;
  decryptionKey: Crypto.Hex;
  decryptionIv: Crypto.Hex;
  viewKey: Crypto.Hex;
  editKey: Crypto.Hex;
}

export const toViewAccessParam = (accessData: NoteAccessData) => {
  Crypto.objectToHex(_.omit(accessData));
  return toAccessParam(accessData, ["id", "editKey"]);
};

export const toEditAccessParam = (accessData: NoteAccessData) => {
  Crypto.objectToHex(_.omit(accessData));
  return toAccessParam(accessData, ["id"]);
};

const toAccessParam = (
  accessData: NoteAccessData,
  omitKeys: Array<keyof NoteAccessData>
) => Crypto.objectToHex(_.omit(accessData, omitKeys));
