<script>
  export let onSubmit;
  let user = {
    username: "",
    password: ""
  };

  const handleSubmit = () => {
    onSubmit({
      username,
      password
    })
  };
</script>

<form class="login" on:submit={handleSubmit}>
  <label>
    Username
    <input bind:value={user.username} />
  </label>

  <label>
    Password
    <input bind:value={user.password} />
  </label>
</form>
