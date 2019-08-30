<script>
  import page from "page";
  import { either } from "result-async";

  import * as Directory from "user/directory.ts";

  let note = { body: "{}" };
  let error;

  const handleSignUp = async () => {
    either(
      await Directory.signUp(),
      () => page.show("/credentials"),
      message => (error = message)
    );
  };
</script>

<div class="signup">
  <button on:click={handleSignUp} disabled={note.id}>Create Account</button>

  {#if error}{error}{/if}

  <a href="/login">Or Log In</a>
</div>
