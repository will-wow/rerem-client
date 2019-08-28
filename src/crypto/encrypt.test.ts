import { ok } from "result-async";
import * as Encrypt from "./encrypt";

describe("encrypt", () => {
  describe("encryptNew", () => {
    it("works both ways", () => {
      const data = "hi";

      const encrypted = Encrypt.encryptNew(data);

      expect(Encrypt.decrypt(encrypted)).toEqual(ok(data));
    });
  });
});
