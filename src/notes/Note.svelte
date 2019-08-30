<script>
  import _ from "lodash";
  import { onMount } from "svelte";

  import * as Directory from "user/directory";
  import * as AccessData from "./access-data";
  import * as Crypto from "../crypto";
  import { fetchAndDecryptNote } from "./note.ts";

  export let note;
  export let accessData;
  export let onSubmit;

  $: viewAccessParam = AccessData.toViewAccessParam(accessData);
  $: editAccessParam = AccessData.toEditAccessParam(accessData);

  let noteSavePromise;
  const handleSubmit = async event => {
    event.preventDefault();

    noteSavePromise = onSubmit(note, accessData);

    const response = await noteSavePromise;
    note.id = response.ok.id;
    accessData.id = response.ok.id;
    Directory.addNote(accessData)
  };
</script>

<style>
  .note {
    display: flex;
    flex-direction: column;
  }
</style>

<form class="note" on:submit={handleSubmit}>
  {#if accessData.editKey}
    <textarea bind:value={note.body} />
    <button type="submit">{accessData.id ? 'Update' : 'Create'}</button>
  {:else}
    <div>{note.body}</div>
  {/if}

  {#if noteSavePromise}
    {#await noteSavePromise}
      Saving...
    {:then _}
      Saved!
    {:catch error}
      Error: {error}
    {/await}
  {/if}

  {#if accessData.id}
    <a href="/notes/{note.id}#?access={viewAccessParam}" target="_blank">
      View Link
    </a>
    {#if accessData.editKey}
      <a href="/notes/{accessData.id}#?access={editAccessParam}" target="_blank">
        Edit Link
      </a>
    {/if}
  {/if}
</form>
