<script>
  import * as Directory from "user/directory";
  import * as AccessData from "./access-data";
  import Markdown from "./Markdown.svelte";
  import QrLinkModal from "qr/QrLinkModal.svelte";

  export let note;
  export let onSubmit;
  export let accessData;

  let isSaved;
  let error;

  $: {
    isSaved = Boolean(accessData.id);
  }

  $: viewAccessParam = AccessData.toViewAccessParam(accessData);
  $: editAccessParam = AccessData.toEditAccessParam(accessData);
  $: viewAccessLink = `/notes/${note.id}#?access=${viewAccessParam}`;
  $: editAccessLink = `/notes/${note.id}#?access=${editAccessParam}`;

  let noteSavePromise;
  const handleSubmit = async () => {
    isSaved = false;
    error = null;

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
    <textarea
      class="form-control note-body mb-3"
      placeholder="Add your note here"
      bind:value={note.body} />
    <button type="submit" class="btn btn-dark w-100">
      {isSaved ? 'Update' : 'Create'}
    </button>
  {:else}
    <div class="note-body">
      <Markdown value={note.body} />
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
    <div class="links row mt-3">
      <div class="col-sm">
        <div class="btn-group w-100">
          <a href={viewAccessLink} target="_blank" class="btn btn-outline-dark">
            View Link
          </a>
          <QrLinkModal
            link={viewAccessLink}
            title="View Link"
            className="flex-grow-0" />
        </div>
      </div>
      {#if accessData.editKey}
        <div class="col-sm">
          <div class="btn-group w-100">
            <a
              href={editAccessLink}
              target="_blank"
              class="btn btn-outline-dark">
              Edit Link
            </a>
            <QrLinkModal link={editAccessLink} className="flex-grow-0" />
          </div>
        </div>
      {/if}
    </div>
  {/if}
</form>
