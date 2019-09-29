import * as AccessKey from "./access-key";

describe("AccessKey", () => {
  describe("createKey", () => {
    it("makes random keys", async () => {
      expect(await AccessKey.createKey()).not.toEqual(
        await AccessKey.createKey()
      );
    });
  });
});
