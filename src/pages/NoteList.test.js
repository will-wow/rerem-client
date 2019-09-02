import { render, waitForElement } from "@testing-library/svelte";
import { readable } from "svelte/store";

import * as Note from "notes/note";

import NoteList from "./NoteList.svelte";

function mockStore(value) {
  return readable(value, () => {});
}

jest.mock("user/directory", () => {
  return {
    loggedIn: mockStore(true),
    accessList: mockStore([])
  };
});

describe("NoteList", () => {
  let component;

  beforeEach(() => {
    jest.spyOn(Note, "fetchNotes").mockResolvedValue({
      ok: [
        {
          body: "hi"
        }
      ]
    });
  });

  it("should show the text", async () => {
    component = render(NoteList, {});

    await waitForElement(() => component.getByText("hi"));
  });
});
