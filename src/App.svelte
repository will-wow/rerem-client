<script>
  import { onMount } from "svelte";
  import { parse } from "query-string";

  import Nav from "user/Nav.svelte";
  import * as Directory from "user/directory";

  export let component;
  export let querystring = "";
  export let params = {};

  $: query = parse(querystring);

  let loginInPromie;
  onMount(() => {
    loginInPromie = Directory.logInFromStorage();
  });
</script>

<svelte:head>
  <title>Rerem</title>
</svelte:head>

<div>
  {#if component}
    {#await loginInPromie then _}
      <Nav />
      <main>
        <svelte:component
          this={component.default || component}
          {...params}
          {query} />
      </main>
    {/await}
  {/if}
</div>
