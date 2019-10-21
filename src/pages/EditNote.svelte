<script>
  import page from "page";
  import { directory } from "user/directory";
  import * as AccessData from "notes/access-data";
  import { fetchAndDecryptNote } from "notes/note";
  import Note from "notes/Note.svelte";

  export let query;
  export let id;

  // Convert query params to access data
  const queryAccessData = query.access
    ? AccessData.decodeAccessParams(query.access, id)
    : null;

  // Merge in data from directory
  $: accessData = { ...$directory[id], ...queryAccessData };

  $: notePromise = fetchAndDecryptNote(accessData);

  const onDelete = () => page.show("/");
</script>

<style>
  .edit-note {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
</style>

<div class="edit-note container mt-3 mb-3">
  <h1>Edit Note</h1>

  {#await notePromise}
    Loading Note...
  {:then note}
    <Note note={note.ok} {accessData} {onDelete} />
  {:catch error}
    Note failed to fetch: {error}
  {/await}
</div>
