<script>
  import { modalStore, closeModal } from "./modal-store";
  import Modal from "./Modal.svelte";
</script>

{#each $modalStore as { component, props }, index}
  <Modal onClose={closeModal} {index}>
    <svelte:component this={component} {...props} />
  </Modal>
{/each}
