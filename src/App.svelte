<script>
  export let component, querystring, pathname, params, title, state, hash;
</script>

<main>
  {#await component}
    Loading...
  {:then component}
    {#if component}
      <svelte:component this={component.default || component} {...params} />
    {/if}
  {/await}
</main>
