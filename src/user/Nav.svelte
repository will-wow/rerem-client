<script>
  import LoadingSpinner from "loading/LoadingSpinner";
  import { loggedIn } from "./directory";
</script>

<style>
  nav {
    background: #11002b;
    color: #e5d5ff;
    position: sticky;
    top: 0;
    z-index: 1;
    height: 1.5rem;
  }

  a {
    color: #e5d5ff;
  }

  .items {
    display: flex;
    align-items: center;
    list-style-type: none;
  }

  li {
    margin-left: 1rem;
  }

  li:first-child {
    margin-left: 0;
  }
</style>

<nav>
  <ul class="items container">
    <li class="flex-grow-1">
      <a href="/" title="Home">
        <strong>Rerem</strong>
      </a>
    </li>
    <LoadingSpinner />
    {#if $loggedIn}
      <li>
        <a href="/credentials" title="User Profile">
          <ion-icon name="person" />
        </a>
      </li>
      <li>
        <a href="/login" title="Log Out">
          <ion-icon name="log-out" />
        </a>
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
