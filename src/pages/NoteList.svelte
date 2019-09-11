<script>
  import * as Note from "notes/note";
  import { accessList, loggedIn } from "user/directory";
  import NoteSummary from "notes/NoteSummary.svelte";
  import NoteComponent from "notes/Note.svelte";
  import Modal from "Modal.svelte";

  $: notes = Note.fetchNotes($accessList);

  let activeNote = null;
</script>

<div class="note-list">
  {#if $loggedIn}
    <h1>My Notes</h1>

    {#await notes}
      Loading
    {:then notes}
      {#each notes.ok as note}
        <NoteSummary {note} onClick={() => (activeNote = note)} />
      {/each}
    {/await}
  {:else}
    <h1>Create an account to get started</h1>
    <h2>Create an anonymous note</h2>
  {/if}

  <Modal isOpen={Boolean(activeNote)} onClose={() => (activeNote = null)}>
    <NoteComponent note={activeNote} />
  </Modal>

</div>
