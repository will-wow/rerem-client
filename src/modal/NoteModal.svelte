<script>
  import Note from "notes/Note.svelte";
  import { activeNote } from "./active-note";
  import Modal from "./Modal.svelte";

  $: isOpen = Boolean($activeNote);

  const onCreate = (note, accessData) => {
    $activeNote.id = accessData.id;
  };
</script>

<Modal {isOpen} onClose={() => ($activeNote = null)}>
  <Note note={$activeNote} {onCreate} />
</Modal>
