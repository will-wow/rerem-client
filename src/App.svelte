<script>
  import queryString from "query-string";

  export let component, querystring, pathname, params, title, state, hash;

  $: query = queryString.parse(querystring);
</script>

<main>
  {#await component}
    Loading...
  {:then component}
    {#if component}
      <svelte:component
        this={component.default || component}
        {...params}
        {query} />
    {/if}
  {/await}
</main>
