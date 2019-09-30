<script>
  import QrCodeDisplay from "qr/QrCodeDisplay.svelte";
  import { openModal } from "modal/modal-store";

  export let link;
  export let title = "";
  export let className = "";

  const open = () => openModal(QrCodeDisplay, { link, title });
</script>

<button
  type="button"
  on:click={open}
  class={`btn btn-outline-dark ${className}`}
  title="QR Code">
  <ion-icon name="qr-scanner" />
</button>
