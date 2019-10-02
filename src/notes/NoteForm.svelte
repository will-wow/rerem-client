<script>
  import * as Directory from "user/directory";
  import { openShare } from "share/open-share";
  import { areYouSure } from "modal/are-you-sure";
  import NoteEditor from "./NoteEditor.svelte";
  import NotePreview from "./NotePreview.svelte";

  export let note;
  export let onSubmit;
  export let onDelete;
  export let accessData;

  let isSaved;
  let preview = false;

  $: canEdit = Boolean(accessData.editKey);
  $: editing = !preview && canEdit;

  $: {
    isSaved = Boolean(accessData.id);
  }

  let noteSavePromise;
  const handleSubmit = async () => {
    isSaved = false;

    noteSavePromise = onSubmit(note, accessData);

    const response = await noteSavePromise;

    response.map(({ id }) => {
      Directory.addNote({ ...accessData, id });
      isSaved = true;
    });
  };
</script>

<style>
  .note {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .note-body {
    flex-grow: 1;
  }

  .links {
    display: flex;
    justify-content: space-around;
  }
</style>

<form class="note" on:submit|preventDefault={handleSubmit}>
  {#if editing}
    <div class="note-body">
      <NoteEditor bind:note />
    </div>
  {:else}
    <div class="note-body">
      <NotePreview {note} />
    </div>
  {/if}
  {#if canEdit}
    <button type="submit" class="btn btn-dark w-100 mt-3">
      {isSaved ? 'Update' : 'Create'}
    </button>
  {/if}

  {#if noteSavePromise}
    {#await noteSavePromise}
      Saving...
    {:then response}
      <div class="mt-3">
        {#if response.ok}
          <div class="alert-success">Saved!</div>
        {:else}
          <div class="alert-danger">
            Error: {JSON.stringify(response.error)}
          </div>
        {/if}
      </div>
    {/await}
  {/if}

  {#if isSaved}
    <div class="links d-flex mt-3">
      <button
        type="button"
        class="btn btn-outline-dark w-100"
        on:click={() => openShare(accessData)}>
        Share
        <ion-icon name="share" />
      </button>

      {#if canEdit}
        <button
          type="button"
          class="btn btn-outline-dark w-100 ml-3"
          on:click={() => (preview = !preview)}>
          {editing ? 'Preview' : 'Edit'}
          <ion-icon name={editing ? 'eye' : 'code'} />
        </button>

        <button
          type="button"
          class="btn btn-outline-dark w-100 ml-3"
          on:click={() => {
            areYouSure(() => onDelete(note, accessData));
          }}>
          Delete
          <ion-icon name="close" />
        </button>
      {/if}
      <!-- TODO -->
      <!-- {#if accessData.editKey}
        <div class="col">
        </div>
      {/if} -->
    </div>
  {/if}
</form>
