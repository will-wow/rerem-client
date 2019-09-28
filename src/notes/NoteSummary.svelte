<script>
  import Markdown from "./Markdown.svelte";

  export let note;
  export let onClick;
  export let onDelete;

  $: text = note.body || note.id;

  $: title = text.split(/\n+/)[0];
  $: contents = text.replace(/.+\n+/, "");
</script>

<style>
  .icon {
    color: var(--secondary);
  }
</style>

<div class="note-summary card mb-3" on:click={onClick} role="button">
  <div class="card-body">
    <h4 class="card-title">{title}</h4>

    <hr />

    <p class="card-text">
      <Markdown value={contents} />
    </p>
  </div>

  <div class="card-body">
    <div class="btn-group">
      <button class="icon icon-button" on:click={onDelete}>
        <ion-icon name="share-alt" />
      </button>
      <button class="icon icon-button" on:click={onDelete}>
        <ion-icon name="share" />
      </button>
      <button class="icon icon-button" on:click={onDelete}>
        <ion-icon name="close" />
      </button>
    </div>
  </div>
</div>
