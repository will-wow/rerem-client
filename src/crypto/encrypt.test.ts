import { ok } from "result-async";
import * as Encrypt from "./encrypt";

describe("encrypt", () => {
  describe("encryptNew", () => {
    it("works both ways", () => {
      const data = "hi";

      const { key, iv } = Encrypt.createEncryptionKey();

      const encrypted = Encrypt.encrypt(data, key, iv);

      expect(Encrypt.decrypt(encrypted, key, iv)).toEqual(ok(data));
    });
  });
});
