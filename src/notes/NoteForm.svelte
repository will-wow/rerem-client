<script>
  import * as Directory from "user/directory";
  import NoteEditor from "./NoteEditor.svelte";
  import NotePreview from "./NotePreview.svelte";
  import { openShare } from "share/open-share";

  export let note;
  export let onSubmit;
  export let accessData;

  let isSaved;

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
  {#if accessData.editKey}
    <div class="note-body">
      <NoteEditor bind:note />
    </div>
    <button type="submit" class="btn btn-dark w-100 mt-3">
      {isSaved ? 'Update' : 'Create'}
    </button>
  {:else}
    <div class="note-body">
      <NotePreview {note} />
    </div>
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
        <div class="flex-grow-1">
          <button
            type="button"
            class="btn btn-outline-dark w-100"
            on:click={() => openShare(accessData)}>
            Share
            <ion-icon name="share" />
          </button>
        </div>
        <!-- TODO -->
        <!-- {#if accessData.editKey}
        <div class="col">
          <button
            type="button"
            class="btn btn-outline-dark w-100"
            on:click={() => openShare(accessData)}>
            Delete
            <ion-icon name="close" />
          </button>
        </div>
      {/if} -->
      </div>
  {/if}
</form>
