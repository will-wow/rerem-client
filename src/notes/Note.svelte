<script>
  import { addNote, directory } from "user/directory";
  import * as AccessData from "./access-data";

  export let note;
  export let onSubmit;
  export let accessData = null;

  $: noteAccessData = accessData || $directory[note.id];
  $: isSaved = Boolean(noteAccessData.id);
  $: viewAccessParam = AccessData.toViewAccessParam(noteAccessData);
  $: editAccessParam = AccessData.toEditAccessParam(noteAccessData);

  let noteSavePromise;
  const handleSubmit = async event => {
    event.preventDefault();

    noteSavePromise = onSubmit(note, noteAccessData);

    const response = await noteSavePromise;
    addNote({ ...noteAccessData, id: response.ok.id });
    isSaved = true;
  };
</script>

<style>
  .note {
    display: flex;
    flex-direction: column;
  }
</style>

<form class="note" on:submit={handleSubmit}>
  {#if noteAccessData.editKey}
    <textarea placeholder="Add your note here" bind:value={note.body} />
    <button type="submit">{isSaved ? 'Update' : 'Create'}</button>
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

  {#if isSaved}
    <a href="/notes/{note.id}#?access={viewAccessParam}" target="_blank">
      View Link
    </a>
    {#if noteAccessData.editKey}
      <a
        href="/notes/{noteAccessData.id}#?access={editAccessParam}"
        target="_blank">
        Edit Link
      </a>
    {/if}
  {/if}
</form>
