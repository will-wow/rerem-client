import { writable } from "svelte/store";

import * as Note from "notes/note";
import { openModal } from "./modal-store";
import NoteModal from "./NoteModal.svelte";

export const activeNote = writable<Note.T | null>(null);

const NEW_NOTE: Note.T = { body: "" };

export const openNote = (note: Note.T = NEW_NOTE) => {
  activeNote.set(note);
  openModal(NoteModal);
};
