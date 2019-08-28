import * as AccessKey from "./access-key";

describe("AccessKey", () => {
  describe("createKey", () => {
    it("makes random keys", async () => {
      expect(await AccessKey.createKey()).not.toEqual(
        await AccessKey.createKey()
      );
    });
  });

  describe("hashKey", () => {
    it("hashes with a new salt every time", async () => {
      expect(await AccessKey.hashKey("key")).not.toEqual(
        await AccessKey.hashKey("key")
      );
    });
  });
});
