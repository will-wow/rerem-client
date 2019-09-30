<script>
  export let value;
</script>

<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">
      <ion-icon name="search" />
    </span>
  </div>

  <input
    class="form-control"
    bind:value
    placeholder="Search"
    aria-label="Search" />
</div>
