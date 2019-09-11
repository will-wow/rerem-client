<script>
  import * as AccessData from "notes/access-data";
  import Note from "notes/Note.svelte";

  const note = { body: "" };
  const accessData = AccessData.generateKeys();
</script>

<h1>Create Note</h1>

<Note {note} {accessData} />
