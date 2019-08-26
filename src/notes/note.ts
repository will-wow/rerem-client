import _ from "lodash";
import fp from "lodash/fp";
import { ResultP, allOkAsync, pipeAsync } from "result-async";
import * as Api from "../api";
import * as Crypto from "../crypto";

export interface NoteAccessData {
  // server: string;
  id: string;
  decryptionKey: Crypto.Hex;
  decryptionIv: Crypto.Hex;
  viewKey: Crypto.Hex;
  editKey: Crypto.Hex;
}

export interface NoteCreateRequest {
  body: Crypto.EncryptedString;
  viewKeyHash: Crypto.Hash;
  editKeyHash: Crypto.Hash;
}

export interface NoteLookupRequest {
  id: string;
  viewKey: Crypto.Hex;
  editKey: Crypto.Hex;
}

export interface NoteResponse {
  id: string;
  body: Crypto.EncryptedString;
}

const accessDataToRequest = (accessData: NoteAccessData): NoteLookupRequest =>
  _.pick(accessData, ["id", "viewKey", "editKey"]);

export const fetchNote = (
  accessData: NoteAccessData
): ResultP<NoteResponse, string> =>
  Api.post<NoteResponse, string>(
    "/notes/lookup",
    accessDataToRequest(accessData)
  );

export const fetchNotes = (
  accessData: NoteAccessData[]
): ResultP<NoteResponse[], string> =>
  pipeAsync(accessData, fp.map(fetchNote), allOkAsync);
