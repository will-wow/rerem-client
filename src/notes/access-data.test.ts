import _ from "lodash";
import * as AccessData from "./access-data";

describe("AccessData", () => {
  const accessData: AccessData.T = {
    id: "abc",
    encryptionKey: "key",
    editKey: "edit",
    server: "https://example.com"
  };

  describe("toEditAccessParam", () => {
    it("encodes all data", () => {
      const param = AccessData.toEditAccessParam(accessData);

      expect(AccessData.decodeAccessParams(param, accessData.id)).toEqual(
        _.omit(accessData)
      );
    });
  });

  describe("toViewAccessParam", () => {
    it("removes edit key", () => {
      const param = AccessData.toViewAccessParam(accessData);

      expect(AccessData.decodeAccessParams(param, accessData.id)).toEqual(
        _.omit(accessData, ["editKey"])
      );
    });
  });
});
