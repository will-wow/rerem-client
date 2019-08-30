<script>
  import queryString from "query-string";
  import { onMount } from "svelte";

  import Nav from "user/Nav.svelte";
  import * as Directory from "user/directory.ts";

  export let component, querystring, pathname, params, title, state, hash, path;

  $: query = queryString.parse(querystring);

  let loginInPromie;
  onMount(() => {
    loginInPromie = Directory.logInFromStorage();
  });
</script>

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
