import * as Encoded from "./encoded";

describe("encode/decode", () => {
  it("works both ways", () => {
    const data = "hi";
    expect(Encoded.decode(Encoded.encode(data))).toBe(data);
  });
});

describe("encodeObject/decodeObject", () => {
  it("works both ways", () => {
    const data = { hello: "world" };
    expect(Encoded.decodeObject(Encoded.encodeObject(data))).toEqual(data);
  });
});
