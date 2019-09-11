import { writable } from "svelte/store";
import * as Note from "notes/note";

export const activeNote = writable<Note.T | null>(null);

export const openNewNote = () => {
  activeNote.set({ body: "" });
};
