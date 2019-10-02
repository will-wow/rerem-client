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

<div class="container">
  <h1>Create Anonymous Note</h1>

  <Note {note} {onCreate} {onDelete} />
</div>
