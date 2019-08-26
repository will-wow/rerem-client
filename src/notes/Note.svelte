<script>
  import * as Crypto from "../crypto";
  import { fetchAndDecryptNote, updateNote } from "./note.ts";
  export let query;

  let note = { body: "" };
  let notePromise;

  $: accessData = Crypto.objectFromHex(query.access);

  function fetchNoteFromQuery(query) {
    notePromise = fetchAndDecryptNote(accessData).then(
      data => (note = data.ok)
    );
  }

  function handleSubmit() {
    updateNote(note, accessData);
  }

  $: fetchNoteFromQuery(query);
</script>

<style>
  .note {
    display: flex;
    flex-direction: column;
  }
</style>

<form class="note" on:submit={handleSubmit}>
  {#await notePromise}
    Loading
  {:then _}
    <textarea bind:value={note.body} />
    <button type="submit">Update</button>
  {:catch foo}
    Note failed to fetch: {foo}
  {/await}

</form>
