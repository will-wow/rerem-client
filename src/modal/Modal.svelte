<script>
  export let isOpen;
  export let onClose;
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
  }

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    background: white;
    width: 75%;
    height: 75%;
  }
</style>

{#if isOpen}
  <div class="modal-background" on:click={onClose}>
    <div class="modal" on:click|stopPropagation>
      <slot {onClose} />
    </div>
  </div>
{/if}
