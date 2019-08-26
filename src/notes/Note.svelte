<script>
  import _ from "lodash";
  import { onMount } from "svelte";

  import * as Crypto from "../crypto";
  import { fetchAndDecryptNote, updateNote } from "./note.ts";

  export let query;
  export let id;

  let note = { body: "" };
  let notePromise;
  let noteSavePromise;

  $: accessParam = query.access;
  $: accessData = { ...Crypto.objectFromHex(accessParam), id };
  $: viewAccessData = _.omit(accessData, ["editKey"]);
  $: viewAccessParam = Crypto.objectToHex(viewAccessData);

  $: console.log({ accessData, note });

  function fetchNoteFromQuery(accessData) {
    notePromise = fetchAndDecryptNote(accessData).then(
      data => (note = data.ok)
    );
  }

  function handleSubmit() {
    noteSavePromise = updateNote(note, accessData);
  }

  onMount(() => {
    fetchNoteFromQuery(accessData);
  });
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
    {#if accessData.editKey}
      <textarea bind:value={note.body} />
      <button type="submit">Update</button>
    {:else}
      <div>{note.body}</div>
    {/if}
  {:catch error}
    Note failed to fetch: {error}
  {/await}

  {#if noteSavePromise}
    {#await noteSavePromise}
      Saving...
    {:then _}
      Saved!
    {:catch error}
      Error: {error}
    {/await}
  {/if}

  <a href="/note/{accessData.id}#?access={viewAccessParam}" target="_blank">
    View Link
  </a>
  {#if accessData.editKey}
    <a href="/note{accessData.id}#?access={accessParam}" target="_blank">
      Edit Link
    </a>
  {/if}
</form>
