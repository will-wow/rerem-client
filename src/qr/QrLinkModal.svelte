<script>
  import QrCodeDisplay from "qr/QrCodeDisplay.svelte";
  import Modal from "modal/Modal.svelte";

  export let link;
  export let title = "";
  export let className = "";

  let isOpen = false;

  const open = () => (isOpen = true);
  const onClose = () => (isOpen = false);
</script>

<button
  type="button"
  on:click={open}
  class={`btn btn-outline-dark ${className}`}
  title="QR Code">
  <ion-icon name="qr-scanner" />
</button>

<Modal {isOpen} {onClose}>
  <QrCodeDisplay {link} {title} />
</Modal>
