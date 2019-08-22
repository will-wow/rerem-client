import { greeting, GREETINGS } from "./greeting-store";

describe("greeting store", () => {
  it("returns a greeting", done => {
    greeting.subscribe(value => {
      expect(GREETINGS).toContain(value);
      done();
    });
  });
});
