<script>
  import QRCode from "qrcode";

  export let link;

  $: fullLink = `${window.location.protocol}//${window.location.host}${link}`;

  let image;
  $: QRCode.toDataURL(fullLink).then(data => (image = data));
  $: style = `background-image: url(${image})`;
</script>

<style>
  div {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>

<div {style} />
