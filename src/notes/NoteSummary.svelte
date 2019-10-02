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
  .note-summary {
    cursor: pointer;
  }
  .icon {
    color: var(--secondary);
  }
</style>

<div class="note-summary card mb-3" on:click={onClick}>
  <div class="card-body" role="button">
    <div class="d-flex align-items-center mb-2">
      <h5 class="card-title flex-grow-1">{title}</h5>

      <button
        class="icon icon-button"
        on:click|stopPropagation={onDelete}
        title="Delete">
        <ion-icon name="close" />
      </button>
    </div>

    <p class="card-text">
      <Markdown value={contents} />
    </p>
  </div>
</div>
