import { render } from "@testing-library/svelte";
import { readable } from "svelte/store";

import Nav from "./Nav.svelte";

function mockStore(value) {
  return readable(value, () => {});
}

jest.mock("./directory", () => {
  return {
    loggedIn: mockStore(true),
    accessList: mockStore([])
  };
});

describe("Nav", () => {
  let component;

  it("should show the text", () => {
    component = render(Nav, {});

    expect(component.container).toHaveTextContent("0 Notes");
  });
});
