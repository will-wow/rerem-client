<script>
  import QRCode from "qrcode";

  export let link;

  $: fullLink = `${window.location.protocol}//${window.location.host}${link}`;

  let image;
  $: QRCode.toDataURL(fullLink).then(data => (image = data));
</script>

<style>
  img {
    width: 100%;
  }
</style>

<img alt="QR Code" src={image} />
