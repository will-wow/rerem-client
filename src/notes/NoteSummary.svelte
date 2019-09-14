<script>
  export let note;
  export let onClick;
  export let onDelete;

  $: text = note.body || note.id;

  $: title = text.split("\n")[0];
</script>

<div class="note-summary">
  <button on:click={onClick}>{title}</button>
  <button on:click={onDelete}>X</button>
</div>
