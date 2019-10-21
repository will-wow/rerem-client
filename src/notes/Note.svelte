<script>
  import { okThen } from "result-async";
  import { pipeA } from "pipeout";
  import { directory, defaultServer, removeNote } from "user/directory";
  import * as AccessData from "./access-data";
  import NoteForm from "./NoteForm.svelte";
  import { createNote, updateNote, deleteNote } from "notes/note";

  export let note;
  export let accessData = null;
  export let onCreate = () => {};
  export let onDelete = () => {};

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
        pipeA(createNote(...args))
          .thru(
            okThen(newNote => {
              noteAccessData = { ...noteAccessData, id: newNote.id };
              onCreate(note, noteAccessData);
              return newNote;
            })
          )
          .value();

  const handleDelete = (note, accessData) => {
    pipeA(deleteNote(note, accessData))
      .thru(
        okThen(() => {
          removeNote(accessData);
          onDelete(note);
        })
      )
      .value();
  };
</script>

{#if !noteAccessData}
  Loading
{:else}
  <NoteForm
    {note}
    {onSubmit}
    accessData={noteAccessData}
    onDelete={handleDelete} />
{/if}
