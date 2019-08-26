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

export const fetchNotes = (
  accessData: NoteAccessData[]
): ResultP<Note[], string> =>
  pipeAsync(accessData, fp.map(fetchAndDecryptNote), allOkAsync);

const fetchAndDecryptNote = (
  accessData: NoteAccessData
): ResultP<Note, string> => {
  return pipeAsync(accessData, fetchNote, okChain(decryptNote(accessData)));
};

export const fetchNote = (
  accessData: NoteAccessData
): ResultP<NoteResponse, string> =>
  Api.post<NoteResponse, string>(
    "/notes/lookup",
    accessDataToRequest(accessData)
  );

const decryptNote = (accessData: NoteAccessData) => (
  note: NoteResponse
): Result<Note, string> => {
  console.log({ accessData, note });
  const result = Crypto.decrypt({
    body: note.body,
    key: accessData.decryptionKey,
    iv: accessData.decryptionIv
  });

  console.log({ accessData, note, result });

  return result.map((body: string) => ({
    id: note.id,
    body
  }));
};
