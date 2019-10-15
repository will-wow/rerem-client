<script>
  import {
    directory,
    addNote,
    removeNote,
    inDirectory,
    loggedIn
  } from "user/directory";
  import IconButton from "form/IconButton.svelte";
  import { areYouSure } from "modal/are-you-sure";

  export let accessData;
</script>

{#if $loggedIn}
  {#if inDirectory(accessData.id, $directory)}
    <IconButton
      class="btn btn-outline-dark w-100 ml-3"
      on:click={() => {
        areYouSure(() => removeNote(accessData), 'This will remove the note from your directory, but will NOT delete it. Anyone will access will continue to be able to see the note.');
      }}
      description="Remove"
      title="Remove note from my directory"
      icon="remove-circle" />
  {:else}
    <IconButton
      class="btn btn-outline-dark w-100 ml-3"
      on:click={() => addNote(accessData)}
      description="Add"
      title="Add note to my directory"
      icon="add-circle" />
  {/if}
{/if}
