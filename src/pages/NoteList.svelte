<script>
  import * as Note from "notes/note.ts";
  import { accessList, loggedIn } from "user/directory.ts";
  import NoteSummary from "notes/NoteSummary.svelte";

  $: notes = Note.fetchNotes($accessList);
</script>

<div class="note-list">
  {#if $loggedIn}
    <h1>My Notes</h1>

    {#await notes}
      Loading
    {:then notes}
      {#each notes.ok as note}
        <NoteSummary {note} />
      {/each}
    {/await}
  {:else}
    <h1>Create an account to get started</h1>
    <h2>Create an anonymous note</h2>
  {/if}
</div>
