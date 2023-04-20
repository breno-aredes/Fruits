import supertest from "supertest";
import app from "app";

const api = supertest(app);

describe("Fruits API", () => {
  describe("POST /fruits", () => {
    it("should create a new fruit", async () => {
      const fruit = {
        name: "Banana",
        price: 1.99,
      };
      const response = await api.post("/fruits").send(fruit);
      expect(response.status).toBe(201);
    });

    it("should return status code 422 when the fruit already exists", async () => {
      const fruit = {
        name: "manga",
      };
      const response = await api.post("/fruits").send(fruit);
      expect(response.status).toBe(422);
    });
  });

  describe("GET /fruits", () => {
    it("should return all fruits", async () => {
      const response = await api.get("/fruits");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("GET /fruits/:id", () => {
    it("should return a specific fruit", async () => {
      const id = 1;
      const response = await api.get(`/fruits/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        name: "Banana",
        price: 1.99,
        id: 1,
      });
    });

    it("should return status code 404 when the fruit does not exist", async () => {
      const id = 999;
      const response = await api.get(`/fruits/${id}`);
      expect(response.status).toBe(404);
    });
  });
});
