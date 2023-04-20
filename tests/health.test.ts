import supertest from "supertest";
import app from "app";

const api = supertest(app);

describe("GET /health", () => {
  it("should respond with code 200", async () => {
    const result = await api.get("/health");

    expect(result.status).toBe(200);
  });
});
