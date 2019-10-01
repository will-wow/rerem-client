<script>
  export let onClose;
  export let index;

  const handleKeydown = event => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const sx = styles =>
    Object.keys(styles)
      .map(rule => `${rule}: ${styles[rule]}`)
      .join("; ");
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
    cursor: pointer;
    padding: 1rem;
  }

  .modal-foreground {
    padding: 1rem;
    background: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    .modal-0 {
      width: 80%;
      height: 80%;
    }

    .modal-1 {
      width: 75%;
      height: 75%;
    }

    .modal-2 {
      width: 70%;
      height: 70%;
    }
  }

  .close-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    .close-header {
      display: none;
    }
  }

  .contents {
    overflow-y: auto;
    height: 100%;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<div class="modal-background" on:click={onClose}>
  <div class={`modal-foreground modal-${index}`}>
    <div class="close-header">
      <ion-icon name="close" />
    </div>
    <div class="contents" on:click|stopPropagation>
      <slot {onClose} />
    </div>
  </div>
</div>
