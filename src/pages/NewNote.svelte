<script>
  import Note from "notes/Note.svelte";

  const note = { body: "" };
</script>

<div class="container">
  <h1>Create Anonymous Note</h1>

  <Note {note} />
</div>
