import App from "./App.svelte";
import Login from "./pages/Login.svelte";
import * as Directory from "./user/directory";

import { render } from "@testing-library/svelte";

describe("App", () => {
  let props;
  let component;

  beforeEach(() => {
    jest.spyOn(Directory, "logInFromStorage").mockResolvedValue(true);

    props = {
      component: Login
    };

    component = render(App, { props });
  });

  it("should show the text", () => {
    expect(component.container).toHaveTextContent("Log In");
  });
});
