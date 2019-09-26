<script>
  import MarkdownIt from "markdown-it";
  const md = new MarkdownIt();

  export let note;

  $: html = md.render(note.body);
</script>

<div>
  {@html html}
</div>
