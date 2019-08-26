import App from "./App.svelte";
import NoteList from "./notes/NoteList.svelte";
import Note from "./notes/Note.svelte";
import Login from "./Login.svelte";
import page from "page";

const app = new App({
  target: document.body
});

page("/notes", ctx => {
  app.$set({ component: NoteList, ...ctx });
});

page("/note", ctx => {
  app.$set({ component: Note, ...ctx });
});

page("/", ctx => {
  app.$set({ component: Login, ...ctx });
});

page.start();

export default app;
