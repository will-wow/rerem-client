import { renameKeys } from "./dictionary";

describe("dictionary utils", () => {
  describe("renameKeys", () => {
    it("renames keys", () => {
      expect(renameKeys({ a: 1, b: 2, c: 3 }, { a: "A", b: "B" })).toEqual({
        A: 1,
        B: 2,
        c: 3
      });
    });

    it("renames keys", () => {
      expect(
        renameKeys({ A: 1, B: 2, C: 3 }, { a: "A", b: "B" }, { invert: true })
      ).toEqual({
        a: 1,
        b: 2,
        C: 3
      });
    });
  });
});
