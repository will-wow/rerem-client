<script>
  import { directory } from "user/directory";
  import * as AccessData from "./access-data";
  import NoteForm from "./NoteForm.svelte";
  import { createNote, updateNote } from "notes/note";
  import { activeNote } from "modal/active-note";

  export let note;
  export let accessData = null;

  const getAccessData = async (accessData, directory, noteId) => {
    return accessData || directory[note.id] || AccessData.generateKeys();
  };

  $: noteAccessData = getAccessData(accessData, $directory, note.id);

  $: onSubmit = note.id
    ? updateNote
    : async (...args) => {
        const response = await createNote(...args);
        $activeNote = { ...note, id: response.ok.id };
        return response;
      };
</script>

{#await noteAccessData}
  Loading
{:then noteAccessData}
  {@debug noteAccessData}
  <NoteForm {note} {onSubmit} accessData={noteAccessData} />
{:catch error}
  Faild to generate keys: {error}
{/await}
