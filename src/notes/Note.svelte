<script>
  import * as Crypto from "../crypto.ts";
  import { fetchAndDecryptNote } from "./note.ts";
  export let query;

  let note = { body: "" };
  let notePromise;

  function fetchNoteFromQuery(query) {
    const accessData = Crypto.objectFromHex(query.access);
    notePromise = fetchAndDecryptNote(accessData).then(
      data => (note = data.ok)
    );
  }

  $: fetchNoteFromQuery(query);
</script>

<form class="note">
  {#await notePromise}
    Loading
  {:then _}
    <!-- <textarea value={note.body} /> -->
    {note.body}
  {:catch foo}
    Note failed to fetch: {foo}
  {/await}
</form>
