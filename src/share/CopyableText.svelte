<script>
  import QrLinkModal from "qr/QrLinkModal.svelte";

  export let value;

  let input;

  const copyText = () => {
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };
</script>

<div class="input-group">
  <input class="form-control" {value} bind:this={input} />

  <div class="input-group-append">
    <button
      type="button"
      class="btn btn-outline-dark"
      on:click={copyText}
      title="Copy">
      <ion-icon name="copy" />
    </button>

    <QrLinkModal link={value} />
  </div>
</div>
