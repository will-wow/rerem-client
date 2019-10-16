<script>
  import LandingPage from "copy/LandingPage.svelte";
  import NoteList from "notes/NoteList.svelte";

  import { accessList, loggedIn, directory, removeNote } from "user/directory";
</script>

{#if $loggedIn}
  <NoteList />
{:else}
  <LandingPage />
{/if}
