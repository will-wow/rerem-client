<script>
  export let isOpen;
  export let onClose;

  const handleKeydown = event => {
    if (event.key === "Escape") {
      onClose();
    }
  };
</script>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.25);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-foreground {
    padding: 1rem;
    background: white;
    width: 75%;
    height: 75%;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div class="modal-background" on:click={onClose}>
    <div class="modal-foreground" on:click|stopPropagation>
      <slot {onClose} />
    </div>
  </div>
{/if}
