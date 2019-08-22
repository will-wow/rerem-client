import { readable } from "svelte/store";

export const GREETINGS = [
  "hello",
  "bonjour",
  "marhaba",
  "hola",
  "guten tag",
  "ni hau",
  "ciao"
];

export const greeting = readable("hello", set => {
  let index = 0;

  const interval = setInterval(() => {
    index = (index + 1) % GREETINGS.length;
    set(GREETINGS[index]);
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});
