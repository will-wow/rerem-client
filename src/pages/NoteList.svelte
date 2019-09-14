<script>
  import * as Note from "notes/note";
  import { accessList, loggedIn, directory, removeNote } from "user/directory";
  import NoteSummary from "notes/NoteSummary.svelte";
  import { activeNote } from "modal/active-note";

  $: notes = Note.fetchNotes($accessList);

  const handleDelete = async note => {
    const accessData = $directory[note.id];
    try {
      await Note.deleteNote(note, accessData);
    } finally {
      removeNote({ ...accessData, id: note.id });
    }
  };
</script>

<div class="note-list">
  {#if $loggedIn}
    <h1>My Notes</h1>

    {#await notes}
      Loading
    {:then notes}
      {#each notes.ok as note}
        <NoteSummary
          {note}
          onClick={() => ($activeNote = note)}
          onDelete={() => handleDelete(note)} />
      {/each}
    {/await}
  {:else}
    <h1>Create an account to get started</h1>
    <h2>Create an anonymous note</h2>
  {/if}
</div>
