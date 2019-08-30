<script>
  import _ from "lodash";
  import { onMount } from "svelte";

  import { directory } from "user/directory";
  import * as AccessData from "notes/access-data";
  import { fetchAndDecryptNote, updateNote } from "../notes/note.ts";
  import Note from "../notes/Note.svelte";

  export let query;
  export let id;

  let accessData = query.access
    ? AccessData.decodeAccessParams(query.access, id)
    : $directory[id];
  let notePromise = fetchAndDecryptNote(accessData);
</script>

<style>
  .note {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="edit-note">
  {#await notePromise}
    Loading Note...
  {:then note}
    <Note note={note.ok} {accessData} onSubmit={updateNote} />
  {:catch error}
    Note failed to fetch: {error}
  {/await}
</div>
