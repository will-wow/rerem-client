<script>
  import { greeting } from "./greeting-store.ts";

  export let name;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>{$greeting} {name}!</h1>
