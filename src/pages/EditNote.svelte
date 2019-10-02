<script>
  import page from "page";
  import { directory } from "user/directory";
  import * as AccessData from "notes/access-data";
  import { fetchAndDecryptNote } from "notes/note";
  import Note from "notes/Note.svelte";

  export let query;
  export let id;

  const accessData = query.access
    ? AccessData.decodeAccessParams(query.access, id)
    : $directory[id];

  const notePromise = fetchAndDecryptNote(accessData);

  const onDelete = () => page.show("/");
</script>

<style>
  .note {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="edit-note container">
  {#await notePromise}
    Loading Note...
  {:then note}
    <Note note={note.ok} {accessData} {onDelete} />
  {:catch error}
    Note failed to fetch: {error}
  {/await}
</div>
