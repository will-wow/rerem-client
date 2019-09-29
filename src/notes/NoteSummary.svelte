<script>
  import * as Note from "./note";
  import Markdown from "./Markdown.svelte";

  export let note;
  export let onClick;
  export let onDelete;

  $: title = Note.getTitle(note);
  $: contents = Note.getContents(note);
</script>

<style>
  .icon {
    color: var(--secondary);
  }
</style>

<div class="note-summary card mb-3">
  <div class="card-body" on:click={onClick} role="button">
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
