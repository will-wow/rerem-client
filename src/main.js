import App from "./App.svelte";
// import NoteList from "./notes/NoteList.svelte";
import Note from "./notes/Note.svelte";
import NewNote from "./notes/NewNote.svelte";
import page from "page";

const app = new App({
  target: document.body
});

// page("/notes", ctx => {
//   app.$set({ component: NoteList, ...ctx });
// });

page("/note/:id", ctx => {
  app.$set({ component: Note, ...ctx });
});

page("/", ctx => {
  app.$set({ component: NewNote, ...ctx });
});

page.start();

export default app;
