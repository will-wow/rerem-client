<script>
  import * as Note from "./note";

  export let note;

  let title;
  let contents;

  $: title = Note.getTitle(note);
  $: contents = Note.getContents(note);

  const handleInput = () => {
    note.body = `${title}\n${contents}`;
  };
</script>

<style>
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  textarea {
    flex-grow: 1;
  }
</style>

<div class="wrapper">
  <input
    class="form-control"
    bind:value={title}
    on:input={handleInput}
    placeholder="Title" />

  <textarea
    class="form-control mt-3"
    placeholder="Add your note here"
    bind:value={contents}
    on:input={handleInput} />
</div>
