<script>
  import { onMount } from "svelte";
  import { parse } from "query-string";

  import Nav from "user/Nav.svelte";
  import ModalStack from "modal/ModalStack.svelte";
  import * as Directory from "user/directory";

  export let component = null;
  export let querystring = "";
  export let params = {};

  $: query = parse(querystring);

  let loginInPromie;
  onMount(() => {
    loginInPromie = Directory.logInFromStorage();
  });
</script>

<style global>
  :root {
    --blue: blue;
  }

  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
</style>

<svelte:head>
  <title>Rerem</title>
</svelte:head>

<div class="app">
  {#if component}
    {#await loginInPromie then _}
      <Nav />
      <main>
        <svelte:component
          this={component.default || component}
          {...params}
          {query} />
      </main>
      <ModalStack />
    {/await}
  {/if}
</div>
