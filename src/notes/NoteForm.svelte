<script>
  import * as Directory from "user/directory";
  import * as AccessData from "./access-data";
  import QrLinkModal from "qr/QrLinkModal.svelte";

  export let note;
  export let onSubmit;
  export let accessData;

  let isSaved;

  $: {
    isSaved = Boolean(accessData.id);
  }

  $: viewAccessParam = AccessData.toViewAccessParam(accessData);
  $: editAccessParam = AccessData.toEditAccessParam(accessData);
  $: viewAccessLink = `/notes/${note.id}#?access=${viewAccessParam}`;
  $: editAccessLink = `/notes/${note.id}#?access=${editAccessParam}`;

  let noteSavePromise;
  const handleSubmit = async event => {
    event.preventDefault();

    noteSavePromise = onSubmit(note, accessData);

    const response = await noteSavePromise;
    const id = response.ok.id;
    Directory.addNote({ ...accessData, id });
    isSaved = true;
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

<form class="note" on:submit={handleSubmit}>
  {#if note.id}
    <div>{note.id}</div>
  {/if}
  {#if accessData.editKey}
    <textarea
      class="note-body"
      placeholder="Add your note here"
      bind:value={note.body} />
    <button type="submit">{isSaved ? 'Update' : 'Create'}</button>
  {:else}
    <div class="note-body">{note.body}</div>
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
    <div class="links">
      <div>
        <a href={viewAccessLink} target="_blank">View Link</a>
        <QrLinkModal link={viewAccessLink} />
      </div>
      {#if accessData.editKey}
        <div>
          <a href={editAccessLink} target="_blank">Edit Link</a>
          <QrLinkModal link={editAccessLink} />
        </div>
      {/if}
    </div>
  {/if}
</form>
