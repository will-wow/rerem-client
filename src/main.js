import page from "page";

import App from "./App.svelte";
import NoteList from "./pages/NoteList.svelte";
import EditNote from "./pages/EditNote.svelte";
import NewNote from "./pages/NewNote.svelte";
import Login from "./pages/Login.svelte";
import Signup from "./pages/Signup.svelte";
import Credentials from "./pages/Credentials.svelte";
import NotFound from "./pages/404.svelte";

const app = new App({
  target: document.body
});

const routeTo = component => ctx => {
  app.$set({ component, ...ctx });
};

page("/", routeTo(NoteList));
page("/notes/new", routeTo(NewNote));
page("/notes/:id", routeTo(EditNote));
page("/credentials", routeTo(Credentials));
page("/login", routeTo(Login));
page("/signup", routeTo(Signup));
page("*", routeTo(NotFound));

page.start();

export default app;
