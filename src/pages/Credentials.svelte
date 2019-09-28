<script>
  import { credentials } from "user/directory";
  import QrLinkModal from "qr/QrLinkModal.svelte";

  const { id, access } = $credentials;

  $: route = `/login#?id=${id}&access=${access}`;
</script>

<div class="container">
  {#if $credentials}
    <h1>Your Credentials</h1>

    <p>Now that you've signed up, you'll want to save your credentials</p>

    <p>
      Rerem is a totally anonymous, totally encrypted service. So if you lose
      these, we can't recover them.
    </p>

    <h3>Password Manager</h3>

    <form on:submit={event => event.preventDefault()}>
      <label>
        Username
        <input type="text" value={id} />
      </label>

      <label>
        Password
        <input type="password" value={access} />
      </label>

      <button type="submit">Save to Password Manager</button>
    </form>

    <h3>Link</h3>

    <a target="_blank" href={route}>Save this login link</a>

    <h3>QR Code</h3>

    <p>
      Login on your device with this QR code:
      <QrLinkModal link={route} />
    </p>
  {/if}
</div>
