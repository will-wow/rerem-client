<script>
  import { greeting } from "./greeting-store.ts";
  import Note from "./Note.svelte";

  export let name;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<Note />
