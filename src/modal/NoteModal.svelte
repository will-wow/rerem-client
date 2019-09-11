<script>
  import Note from "notes/Note.svelte";
  import { activeNote } from "./active-note";
  import Modal from "./Modal.svelte";

  $: isOpen = Boolean($activeNote);
</script>

<Modal {isOpen} onClose={() => ($activeNote = null)}>
  <Note note={$activeNote} />
</Modal>
