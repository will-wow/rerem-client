<script>
  import QRCode from "qrcode";

  export let link;
  export let title = "";

  let image;
  $: QRCode.toDataURL(link).then(data => (image = data));
  $: style = `background-image: url(${image})`;
</script>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .qr {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    flex-grow: 1;
  }

  .title {
    text-align: center;
  }
</style>

<div class="wrapper">
  {#if title}
    <h2 class="title">{title}</h2>
  {/if}
  <div class="qr" {style} />
</div>
