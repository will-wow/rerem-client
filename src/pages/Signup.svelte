<script>
  import page from "page";
  import { either } from "result-async";

  import * as Directory from "user/directory";

  const note = { body: "{}" };
  let server = "http://localhost:4000";
  let error;

  const handleSignUp = async () => {
    either(
      await Directory.signUp(server),
      () => page.show("/credentials"),
      message => (error = message)
    );
  };
</script>

<form class="signup" on:submit|preventDefault={handleSignUp}>
  <input bind:value={server} />

  <button type="submit" disabled={!server}>Create Account</button>

  {#if error}{error}{/if}

  <a href="/login">Or Log In</a>
</form>
