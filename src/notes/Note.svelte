<script>
  import * as Directory from "user/directory";
  import * as AccessData from "./access-data";

  export let note;
  export let accessData;
  export let onSubmit;

  let isSaved = Boolean(accessData.id);

  $: viewAccessParam = AccessData.toViewAccessParam(accessData);
  $: editAccessParam = AccessData.toEditAccessParam(accessData);

  let noteSavePromise;
  const handleSubmit = async event => {
    event.preventDefault();

    noteSavePromise = onSubmit(note, accessData);

    const response = await noteSavePromise;
    Directory.addNote({ ...accessData, id: response.ok.id });
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
  {#if accessData.editKey}
    <textarea placeholder="Add your note here" bind:value={note.body} />
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

  {#if isSaved}
    <a href="/notes/{note.id}#?access={viewAccessParam}" target="_blank">
      View Link
    </a>
    {#if accessData.editKey}
      <a
        href="/notes/{accessData.id}#?access={editAccessParam}"
        target="_blank">
        Edit Link
      </a>
    {/if}
  {/if}
</form>
