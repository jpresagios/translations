import "@babel/polyfill";

import request from "supertest";

import router from "../../src/config/routes";
import { app } from "../../src/infrastructure/express";
import fileLoad from "../utils/fileLoad";

router();

describe("Testing controllers ", () => {
  beforeEach(async () => {
    await testData();
  });
  describe("POST /search", () => {
    it("Search to elastic", async () => {
      const query = { criteria: "Hello" };
      const response = await request(app).post("/search").send(query);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(3);
      expect(response.body.query).toBe("Hola");
      expect(response.body.traslations.length).toBe(3);
    });
  });

  describe("Post /import", () => {
    it("Import valid json file", async () => {
      const response = await request(app)
        .post("/import")
        .send({
          file: "translations.json",
          data: fileLoad("translation.valid.json")
        });
      expect(response.status).toBe(201);
    });

    it("Import invalid json file", async () => {
      const response = await request(app)
        .post("/import")
        .send({
          file: "translations.json",
          data: fileLoad("translation.invalid.json")
        });
      expect(response.status).toBe(400);
    });

    it("Import invalid json to elastic", async () => {
      const response = await request(app)
        .post("/import")
        .send({
          filename: "translations.json",
          data: fileLoad("translation.invalid-data.json")
        });
      expect(response.status).toBe(400);
    });
  });
});
