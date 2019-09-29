<script>
  import { pipeAsync, okThen } from "result-async";
  import { directory, defaultServer } from "user/directory";
  import * as AccessData from "./access-data";
  import NoteForm from "./NoteForm.svelte";
  import { createNote, updateNote } from "notes/note";

  export let note;
  export let accessData = null;
  export let onCreate = () => {};

  let noteAccessData;

  const getAccessData = async () => {
    noteAccessData =
      accessData ||
      $directory[note.id] ||
      (await AccessData.generateKeys($defaultServer));
  };

  getAccessData();

  $: onSubmit = note.id
    ? updateNote
    : (...args) =>
        pipeAsync(
          createNote(...args),
          okThen(newNote => {
            noteAccessData = { ...noteAccessData, id: newNote.id };
            onCreate(note, noteAccessData);
            return newNote;
          })
        );
</script>

{#if !noteAccessData}
  Loading
{:else}
  <NoteForm {note} {onSubmit} accessData={noteAccessData} />
{/if}
