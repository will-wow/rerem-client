<script>
  import { modalStore, closeModal } from "./modal-store";
  import Modal from "./Modal.svelte";
</script>

{#each $modalStore as { component, small, props }, index}
  <Modal onClose={closeModal} {index} {small}>
    <svelte:component this={component} {...props} onClose={closeModal} />
  </Modal>
{/each}
