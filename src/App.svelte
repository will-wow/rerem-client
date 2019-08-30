<script>
  import queryString from "query-string";

  import Nav from "user/Nav.svelte";
  import * as Directory from "user/directory.ts";

  export let component, querystring, pathname, params, title, state, hash, path;

  $: query = queryString.parse(querystring);

  const loginInPromie = Directory.logInFromStorage();
</script>

<div>
  {#if component}
    <Nav />
    <main>
      {#await loginInPromie then _}
        {#if component}
          <svelte:component
            this={component.default || component}
            {...params}
            {query} />
        {/if}
      {/await}
    </main>
  {/if}
</div>
