type HexString = string;

interface Note {
  body: HexString;
  key: HexString;
  iv: HexString;
}

export type T = Note;

export const EMPTY_NOTE = {
  body: '',
  key: '',
  iv: ''
}