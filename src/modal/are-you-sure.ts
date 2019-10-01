import { openModal } from "./modal-store";
import AreYouSure from "./AreYouSure.svelte";

export const areYouSure = (onYes: () => void) => {
  openModal(AreYouSure, { onYes, small: true });
};
