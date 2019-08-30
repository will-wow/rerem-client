import { ok } from "result-async";
import * as Encrypt from "./encrypt";
import * as AccessKey from "./access-key";

describe("encrypt", () => {
  describe("encryptNew", () => {
    it("works both ways", async () => {
      const data = "hi";

      const key = await AccessKey.createKey();

      const encrypted = await Encrypt.encrypt(data, key);

      expect(Encrypt.decrypt(encrypted, key)).toEqual(ok(data));
    });
  });
});
