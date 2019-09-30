<script>
  import { onMount } from "svelte";
  import { parse } from "query-string";
  import "./app.css";

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

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }
</script>

<style global>
  :root {
    --blue: blue;
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
