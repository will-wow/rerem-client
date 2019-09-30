<script>
  import Note from "notes/Note.svelte";
  import { activeNote } from "./active-note";

  const onCreate = (note, accessData) => {
    $activeNote.id = accessData.id;
  };
</script>

<Note note={$activeNote} {onCreate} />
