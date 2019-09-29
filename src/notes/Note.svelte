<script>
  import { pipeAsync, okThen } from "result-async";
  import { directory, defaultServer } from "user/directory";
  import * as AccessData from "./access-data";
  import NoteForm from "./NoteForm.svelte";
  import { createNote, updateNote } from "notes/note";
  import { activeNote } from "modal/active-note";

  export let note;
  export let accessData = null;

  const getAccessData = async (accessData, directory, noteId) => {
    return (
      accessData || directory[noteId] || AccessData.generateKeys($defaultServer)
    );
  };

  $: noteAccessData = getAccessData(accessData, $directory, note.id);

  $: onSubmit = note.id
    ? updateNote
    : async (...args) =>
        pipeAsync(
          createNote(...args),
          okThen(newNote => {
            // Gram the ID from the new note. But leave the decrypted body as is.
            $activeNote = { ...note, id: newNote.id };
            return newNote;
          })
        );
</script>

{#await noteAccessData}
  Loading
{:then noteAccessData}
  <NoteForm {note} {onSubmit} accessData={noteAccessData} />
{:catch error}
  Faild to generate keys: {error}
{/await}
