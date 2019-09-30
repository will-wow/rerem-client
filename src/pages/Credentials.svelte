<script>
  import { credentials } from "user/directory";
  import CopyableText from "share/CopyableText";
  import { absoluteLink } from "share/absolute-link";

  const { id, access } = $credentials;

  $: route = absoluteLink(`/login#?id=${id}&access=${access}`);
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

    <p>
      Use this form to tell your browser to save your anonymous Rerem username
      and password.
    </p>

    <form on:submit={event => event.preventDefault()}>
      <label>
        Username
        <input type="text" value={id} class="form-control" />
      </label>

      <label>
        Password
        <input type="password" value={access} class="form-control" />
      </label>

      <button type="submit" class="btn btn-dark">
        Save to Password Manager
      </button>
    </form>

    <h3>Link</h3>

    <p>
      Or use this link to log in on another device. Be careful, as anyone with
      this link can access all your notes!
    </p>

    <CopyableText value={route} />
  {/if}
</div>
