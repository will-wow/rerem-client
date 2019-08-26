type HexString = string;
type EncryptedString = string;

export interface NoteEncryptionData {
  body: EncryptedString;
  decryptionKey: HexString;
  iv: HexString;
}

export const EMPTY_ENCRYPTED_NOTE = {
  body: "",
  decryptionKey: "",
  iv: ""
};

export interface NoteAccessData {
  // server: string;
  id: string;

  viewKey: string;
  editKey: string;
}

export interface NoteCreateRequest {
  body: EncryptedString;
  viewKeyHash: string;
  editKeyHash: string;
}

export interface NoteResponse {
  id: string;
  body: EncryptedString;
}
