<script>
  import { credentials } from "user/directory";

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

    <a target="_blank" href={route}>Or save this login link</a>
  {/if}
</div>
