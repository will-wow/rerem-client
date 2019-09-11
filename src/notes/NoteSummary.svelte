<script>
  export let note;
  export let onClick;
</script>

<div class="note-summary">
  <button on:click={onClick}>{note.body || note.id}</button>
</div>
