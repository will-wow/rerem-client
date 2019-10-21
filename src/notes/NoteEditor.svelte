<script>
  import * as Note from "./note";

  export let note;

  let title;
  let contents;

  $: title = Note.getTitle(note);
  $: contents = Note.getContents(note);

  const handleInput = event => {
    const {
      target: { name, value }
    } = event;

    const newTitle = name === "title" ? value : title;
    const newContents = name === "contents" ? value : contents;
    note.body = `${newTitle}\n${newContents}`;
  };
</script>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  textarea {
    flex-grow: 1;
  }
</style>

<div class="wrapper">
  <!-- svelte-ignore a11y-autofocus -->
  <input
    autofocus
    autocomplete="off"
    class="form-control"
    placeholder="Title"
    name="title"
    value={title}
    on:input={handleInput} />

  <textarea
    class="form-control mt-3"
    placeholder="Add your note here"
    name="contents"
    value={contents}
    on:input={handleInput} />
</div>
