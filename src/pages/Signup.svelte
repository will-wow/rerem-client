<script>
  import page from "page";
  import { either } from "result-async";

  import * as Directory from "user/directory";

  let server = process.env.API;
  let error;

  const handleSignUp = async () => {
    either(
      await Directory.signUp(server),
      () => page.show("/credentials"),
      message => (error = message)
    );
  };
</script>

<div class="signup container">
  <h1>New Account</h1>

  <form on:submit|preventDefault={handleSignUp}>
    <label class="form-group">
      Server
      <input class="form-control" bind:value={server} />
    </label>

    <button class="btn btn-dark w-100" type="submit" disabled={!server}>
      Create Account
    </button>

    {#if error}{error}{/if}

    <a href="/login" class="mt-2">Or Log In</a>
  </form>
</div>
