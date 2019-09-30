import * as AccessData from "notes/access-data";
import { openModal } from "modal/modal-store";
import ShareNote from "./ShareNote.svelte";

export const openShare = (accessData: AccessData.T) => {
  openModal(ShareNote, { accessData });
};
