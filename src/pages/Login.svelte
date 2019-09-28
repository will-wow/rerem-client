<script>
  import page from "page";
  import * as Directory from "user/directory";

  export let query;

  let id = query.id;
  let accessParam = query.access;

  const handleSubmit = async event => {
    event.preventDefault();

    await Directory.logIn(id, accessParam);
    page.show("/");
  };

  Directory.logOut();
</script>

<svelte:head>
  <title>Rerem: Login</title>
</svelte:head>

<div class="login container">
  <form on:submit={handleSubmit}>
    <h1>Log In</h1>

    <label class="form-group">
      Username
      <input class="form-control" type="text" bind:value={id} />
    </label>

    <label class="form-group">
      Password
      <input class="form-control" type="password" bind:value={accessParam} />
    </label>

    <button type="submit" class="btn btn-dark w-100">Log In</button>

    <a href="/signup" class="mt-2">Or create a new account</a>
  </form>
</div>
