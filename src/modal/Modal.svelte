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

  $: size = `${75 - index * 5}%`;
  $: style = sx({ width: size, height: size });
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
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<div class="modal-background" on:click={onClose}>
  <div class="modal-foreground" on:click|stopPropagation {style}>
    <slot {onClose} />
  </div>
</div>
