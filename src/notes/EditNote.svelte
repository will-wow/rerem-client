<script>
  import _ from "lodash";
  import { onMount } from "svelte";

  import * as AccessData from "./access-data";
  import { fetchAndDecryptNote, updateNote } from "./note.ts";
  import Note from "./Note.svelte";

  export let query;
  export let id;

  let accessParam = query.access;
  let accessData = AccessData.decodeAccessParams(accessParam, id);
  let notePromise = fetchAndDecryptNote(accessData)
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
