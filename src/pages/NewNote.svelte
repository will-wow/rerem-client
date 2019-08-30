<script>
  import * as AccessData from "notes/access-data.ts";
  import { createNote } from "notes/note.ts";
  import Note from "notes/Note.svelte";

  const note = { body: "" };
  const accessData = AccessData.generateKeys();
</script>

<div class="new-note">
  {#await accessData}
    Generating Keys...
  {:then accessData}
    <Note {note} {accessData} onSubmit={createNote} />
  {:catch error}
    Faild to generate keys: {error}
  {/await}
</div>
