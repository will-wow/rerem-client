<script>
  import * as MarkdownIt from "markdown-it";
  const md = new MarkdownIt();

  export let value;

  $: html = md.render(value);
</script>

<div>
  {@html html}
</div>
