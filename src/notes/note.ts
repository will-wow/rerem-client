import _ from "lodash";
import fp from "lodash/fp";
import { ResultP, Result, allOkAsync, pipeAsync, okChain } from "result-async";
import * as Api from "../api";
import * as Crypto from "../crypto";

interface Note {
  id: string;
  body: string;
}

export type T = Note;

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
  viewKey: Crypto.Hex;
  editKey: Crypto.Hex;
}

export interface NoteResponse {
  id: string;
  body: Crypto.EncryptedString;
}

const accessDataToRequest = (accessData: NoteAccessData): NoteLookupRequest =>
  _.pick(accessData, ["viewKey", "editKey"]);

export const fetchNotes = (
  accessData: NoteAccessData[]
): ResultP<Note[], string> =>
  pipeAsync(accessData, fp.map(fetchAndDecryptNote), allOkAsync);

export const fetchAndDecryptNote = (
  accessData: NoteAccessData
): ResultP<Note, string> => {
  return pipeAsync(accessData, fetchNote, okChain(decryptNote(accessData)));
};

export const fetchNote = (
  accessData: NoteAccessData
): ResultP<NoteResponse, string> =>
  Api.get<NoteResponse, string>(
    `/notes/${accessData.id}`,
    accessDataToRequest(accessData)
  );

const decryptNote = (accessData: NoteAccessData) => (
  note: NoteResponse
): Result<Note, string> => {
  const result = Crypto.decrypt({
    body: note.body,
    key: accessData.decryptionKey,
    iv: accessData.decryptionIv
  });

  return result.map((body: string) => ({
    id: note.id,
    body
  }));
};
