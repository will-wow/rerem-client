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
</script>

<svelte:head>
  <title>Rerem: Login</title>
</svelte:head>

<form class="login" on:submit={handleSubmit}>
  <h1>Log In</h1>

  <label>
    Username
    <input class="form-control" type="text" bind:value={id} />
  </label>

  <label>
    Password
    <input class="form-control" type="password" bind:value={accessParam} />
  </label>

  <button type="submit" class="btn btn-dark">Log In</button>
</form>
<a href="/signup">Or create an account</a>
