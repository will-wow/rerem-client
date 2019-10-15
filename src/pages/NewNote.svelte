<script>
  import page from "page";
  import * as AccessData from "notes/access-data";
  import Note from "notes/Note.svelte";

  const note = { body: "" };

  const onCreate = (note, accessData) => {
    const editAccessParam = AccessData.toEditAccessParam(accessData);
    const editAccessLink = `/notes/${accessData.id}#?access=${editAccessParam}`;

    page.show(editAccessLink);
  };

  const onDelete = () => page.show("/");
</script>

<style>
  .new-note {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
</style>

<div class="new-note container mt-3 mb-3">
  <h1>Create Anonymous Note</h1>

  <p>
    Create an anonymous note. You can save the link, and share it with your
    friends. But Rerem is a totally anonymous, totally encrypted service. So if
    you lose the link, we can't recover it. To save notes, you can
    <a href="/signup">Create an account</a>
  </p>

  <Note {note} {onCreate} {onDelete} />
</div>
