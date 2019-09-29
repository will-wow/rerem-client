<script>
  import * as Note from "./note";
  import Markdown from "./Markdown.svelte";

  export let note;

  $: title = Note.getTitle(note);
  $: contents = Note.getContents(note);
</script>

<h4 class="card-title">{title}</h4>

<hr />

<Markdown value={contents} />
