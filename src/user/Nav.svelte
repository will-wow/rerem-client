<script>
  import { loggedIn, accessList } from "./directory";
  import { openNewNote } from "modal/active-note";
</script>

<style>
  .items {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    list-style-type: none;
  }

  li {
    margin-left: 1rem;
  }

  button,
  a {
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    color: var(--blue);
    cursor: pointer;
  }
</style>

<nav>
  <ul class="items">
    {#if $loggedIn}
      <li>{$accessList.length} Notes</li>
      <li>
        <a href="/">My Notes</a>
      </li>
      <li>
        <button on:click={openNewNote} class="link">New Note</button>
      </li>
      <li>
        <a href="/credentials">Creds</a>
      </li>
    {:else}
      <li>
        <a href="/notes/new">Anonymous Note</a>
      </li>
      <li>
        <a href="/login">Log In</a>
      </li>
      <li>
        <a href="/signup">Sign Up</a>
      </li>
    {/if}
  </ul>
</nav>
