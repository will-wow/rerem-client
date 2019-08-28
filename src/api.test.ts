import { ok } from "result-async";
import MockAdapter from "axios-mock-adapter";
import * as Api from "./api";

describe("Api", () => {
  const note = { id: "id", body: "body" };

  let mockApi: MockAdapter;

  beforeEach(() => {
    mockApi = new MockAdapter(Api.axios);
    mockApi.onGet("/api/notes").reply(() => [200, [note]]);
  });

  afterEach(() => {
    mockApi.restore();
  });

  describe("get", () => {
    it("gets with query params", async () => {
      const notes = await Api.get("/api/notes");

      expect(notes).toEqual(ok([note]));
    });
  });
});
