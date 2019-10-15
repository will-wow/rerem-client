<script>
  import { onMount } from "svelte";
  export let onYes;
  export let description = "";
  export let onClose;

  let yesButton;

  const onYesClick = () => {
    onYes();
    onClose();
  };

  onMount(() => {
    yesButton.focus();
  });
</script>

<div>
  <h2>Are you sure?</h2>
  {#if description}
    <p>{description}</p>
  {/if}
  <div class="btn-group w-100 mt-3">
    <button class="btn btn-dark" on:click={onYesClick} bind:this={yesButton}>
      Yes
    </button>
    <button class="btn btn-outline-dark" on:click={onClose}>No</button>
  </div>
</div>
