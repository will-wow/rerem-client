<script>
  import * as Directory from "user/directory";
  import { openShare } from "share/open-share";
  import { areYouSure } from "modal/are-you-sure";
  import { startLoading, finishLoading } from "loading/loading-store";
  import IconButton from "form/IconButton.svelte";
  import NoteEditor from "./NoteEditor.svelte";
  import NotePreview from "./NotePreview.svelte";
  import DirectoryToggle from "./DirectoryToggle.svelte";

  export let note;
  export let onSubmit;
  export let onDelete;
  export let accessData;

  let isSaved = false;
  let isDirty = false;
  let lastResponse = null;
  let preview = false;

  $: canEdit = Boolean(accessData.editKey);
  $: editing = !preview && canEdit;

  $: {
    isSaved = Boolean(accessData.id);
  }

  const handleSubmit = async () => {
    startLoading();
    lastResponse = null;

    lastResponse = await onSubmit(note, accessData);

    finishLoading();

    lastResponse.map(({ id }) => {
      Directory.addNote({ ...accessData, id });
      isSaved = true;
      isDirty = false;
    });
  };
</script>

<style>
  .note {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
  }

  .note-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .links {
    display: flex;
    justify-content: space-around;
  }
</style>

<form class="note" on:submit|preventDefault={handleSubmit}>
  {#if editing}
    <div class="note-body">
      <NoteEditor bind:note onChange={() => (isDirty = true)} />
    </div>
  {:else}
    <div class="note-body">
      <NotePreview {note} />
    </div>
  {/if}
  {#if canEdit}
    <button
      type="submit"
      class="btn btn-dark w-100 mt-3"
      title={isDirty ? 'Unsaved Changes' : 'Save note'}>
      {isSaved ? 'Update' : 'Create'}
      {#if isDirty}
        <ion-icon name="alert" />
      {/if}
    </button>
  {/if}

  {#if lastResponse && lastResponse.error}
    <div class="mt-3">
      <div class="alert-danger">
        Error: {JSON.stringify(lastResponse.error)}
      </div>
    </div>
  {/if}

  {#if isSaved}
    <div class="links d-flex mt-3">
      <IconButton
        type="button"
        class="btn btn-outline-dark w-100"
        on:click={() => openShare(accessData)}
        description="Share"
        icon="share" />

      {#if canEdit}
        <IconButton
          class="btn btn-outline-dark w-100 ml-3"
          on:click={() => (preview = !preview)}
          description={editing ? 'Preview' : 'Edit'}
          icon={editing ? 'eye' : 'code'} />

        <DirectoryToggle {accessData} />

        <IconButton
          class="btn btn-outline-dark w-100 ml-3"
          on:click={() => {
            areYouSure(() => onDelete(note, accessData), 'This will delete the note forever. If anyone else has access to this note, they will not be able to see it. This is irreversible.');
          }}
          description="Delete"
          icon="close" />
      {/if}
    </div>
  {/if}
</form>
