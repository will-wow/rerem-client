<script>
  import { modalStore, closeModal } from "./modal-store";
  import Modal from "./Modal.svelte";
</script>

{#each $modalStore as { component, props }}
  <Modal onClose={closeModal}>
    <svelte:component this={component} {...props} />
  </Modal>
{/each}
