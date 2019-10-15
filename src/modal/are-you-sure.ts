import { openModal } from "./modal-store";
import AreYouSure from "./AreYouSure.svelte";

export const areYouSure = (onYes: () => void, description?: string) => {
  openModal(AreYouSure, { onYes, description, small: true });
};
