import _ from "lodash";
import fp from "lodash/fp";
import { ResultP, Result, allOkAsync, pipeAsync, okChain } from "result-async";
import * as Api from "../api";
import * as Crypto from "../crypto";
import * as AccessData from './access-data'

interface Note {
  id: string;
  body: string;
}

export type T = Note;

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

export const updateNote = (
  note: Note,
  accessData: AccessData.T
): ResultP<NoteResponse, string> => {
  const encryptedData = Crypto.reEncrypt(
    note.body,
    accessData.decryptionKey,
    accessData.decryptionIv
  );

  return Api.put(`/notes/${accessData.id}`, {
    body: encryptedData.body,
    ...accessDataToRequest(accessData)
  });
};

const decryptNote = (accessData: AccessData.T) => (
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
