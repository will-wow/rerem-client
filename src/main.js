import page from "page";

import App from "./App.svelte";
import Home from "./pages/Home.svelte";
import EditNote from "./pages/EditNote.svelte";
import NewNote from "./pages/NewNote.svelte";
import Login from "./pages/Login.svelte";
import Signup from "./pages/Signup.svelte";
import Credentials from "./pages/Credentials.svelte";
import NotFound from "./pages/404.svelte";

import * as serviceWorker from "./serviceWorker";

import "./app.css";

// Remove service worker when not in prod.
if (process.env.NODE_ENV === "production") {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}

const app = new App({
  target: document.body
});

const routeTo = component => ctx => {
  app.$set({ component, ...ctx });
};

page("/", routeTo(Home));
page("/notes/new", routeTo(NewNote));
page("/notes/:id", routeTo(EditNote));
page("/credentials", routeTo(Credentials));
page("/login", routeTo(Login));
page("/signup", routeTo(Signup));
page("*", routeTo(NotFound));

page.start();

export default app;
