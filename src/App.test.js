import App from "./App.svelte";

import { render } from "@testing-library/svelte";

describe("App", () => {
  let props;
  let component;

  beforeEach(() => {
    props = { name: "world" };

    component = render(App, { props });
  });

  it("should show the text", () => {
    expect(component.container).toHaveTextContent("world");
  });
});
