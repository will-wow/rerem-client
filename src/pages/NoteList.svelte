<script>
  import * as Note from "notes/note";
  import { accessList, loggedIn, directory, removeNote } from "user/directory";
  import NoteSummary from "notes/NoteSummary.svelte";
  import { activeNote, openNewNote } from "modal/active-note";

  let notes;

  const fetchNotes = accessList => {
    Note.fetchNotes(accessList).then(data => (notes = data));
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

<div class="note-list container">
  {#if $loggedIn}
    <div class="btn-group mb-3 w-100">
      <button class="btn btn-outline-dark" on:click={openNewNote}>
        New Note
      </button>
    </div>

    {#if !notes}
      Loading
    {:else}
      {#each notes.ok as note}
        <NoteSummary
          {note}
          onClick={() => ($activeNote = note)}
          onDelete={() => handleDelete(note)} />
      {/each}
    {/if}
  {:else}
    <h1>Create an account to get started</h1>
    <h2>Create an anonymous note</h2>
  {/if}
</div>
