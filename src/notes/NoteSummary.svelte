<script>
  export let note;
</script>

<div class="note-summary">
  <a href="/notes/{note.id}">{note.body || note.id}</a>
</div>
