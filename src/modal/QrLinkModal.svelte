<script>
  import QrCodeDisplay from "modal/QrCodeDisplay.svelte";
  import Modal from "modal/Modal.svelte";

  export let link;

  let isOpen = false;

  const open = () => (isOpen = true);
  const onClose = () => (isOpen = false);
</script>

<button type="button" on:click={open}>QR</button>

<Modal {isOpen} {onClose}>
  <QrCodeDisplay {link} />
</Modal>
