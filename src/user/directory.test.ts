import { get } from "svelte/store";
import { ok } from "result-async";
import * as Directory from "./directory";

describe("Directory", () => {
  describe("loggedIn", () => {
    it("is logged in", () => {
      Directory.store.set(
        ok({
          accessData: {
            id: "a",
            encryptionKey: "k",
            editKey: "e",
            server: "https://example.com"
          },
          directory: {}
        })
      );

      expect(get(Directory.loggedIn)).toBe(true);
    });
  });
});
