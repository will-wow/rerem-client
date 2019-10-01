<script>
  import { pipeAsync, okThen } from "result-async";
  import * as Note from "notes/note";
  import { accessList, loggedIn, directory, removeNote } from "user/directory";
  import NoteSummary from "notes/NoteSummary.svelte";
  import SearchInput from "form/SearchInput.svelte";
  import { openNote } from "modal/active-note";

  let notes;
  let search = "";

  $: filteredNotes =
    notes && search
      ? notes.filter(note => note.body.toLowerCase().includes(search))
      : notes;

  const fetchNotes = accessList => {
    pipeAsync(
      Note.fetchNotes(accessList),
      okThen(newNotes => (notes = newNotes))
    );
  };

  $: fetchNotes($accessList);

  const handleDelete = async note => {
    const accessData = $directory[note.id];
    try {
      await Note.deleteNote(note, accessData);
    } finally {
      removeNote({ ...accessData, id: note.id });
    }
  };
</script>

<style>
  .note-list {
    position: relative;
  }
  .actions {
    position: sticky;
    background: white;
    top: 1.5rem;
    padding-top: 1rem;
    margin-top: -1rem;
    padding-bottom: 1rem;
    z-index: 1;
  }
</style>

<div class="note-list container">
  {#if $loggedIn}
    <div class="row actions">
      <div class="col-md-8 mb-3 mb-md-0">
        <button class="btn btn-outline-dark w-100" on:click={() => openNote()}>
          New Note
        </button>
      </div>
      <div class="col-md-4">
        <SearchInput bind:value={search} />
      </div>
    </div>

    {#if !notes}
      Loading
    {:else}
      {#each filteredNotes as note}
        <NoteSummary
          {note}
          onClick={() => openNote(note)}
          onDelete={() => handleDelete(note)} />
      {/each}
    {/if}
  {:else}
    <h1>Create an account to get started</h1>
    <h2>Create an anonymous note</h2>
  {/if}
</div>
