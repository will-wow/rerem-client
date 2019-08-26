<script>
  export let note;
</script>

<form class="note">
  <textarea bind:value={note.body} />
</form>
