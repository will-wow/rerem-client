<script>
  import { onMount } from "svelte";
  export let onYes;
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
  <div class="btn-group w-100 m-3">
    <button class="btn btn-dark" on:click={onYesClick} bind:this={yesButton}>
      Yes
    </button>
    <button class="btn btn-outline-dark" on:click={onClose}>No</button>
  </div>
</div>
