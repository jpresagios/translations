import "@babel/polyfill";

import request from "supertest";

import router from "../../src/config/routes";
import { app } from "../../src/infrastructure/express";

router();

describe("Testing controllers ", () => {
    beforeEach(async () => {
        await helper.saveFakeHistories(3)
    })
    describe("POST /search", () => {
        it("Search to elastic", async () => {
            const response = await request(app).post("/search")
            expect(response.status).toBe(200)
            expect(response.body.totalRetrieved).toBe(3)
            expect(response.body.query).toBe("mundo")
            expect(response.body.traslations.length).toBe(3)
        })
    });

    describe("Post /import", () => {
        it("Import valid json file", async () => {
            const response = await request(app).post("/import").send({
                file: "fancy-name",
                data: helper.getValidJsonBase64()
            });
            expect(response.status).toBe(201);
        });
        it("Import invalid json file", async () => {
            const response = await request(app).post("/import").send({
                file: "translations.json",
                data: helper.getInvalidFilenBase64()
            });
            expect(response.status).toBe(400);
        });
        it("Import invalid json to elastic", async () => {
            const response = await request(app).post("/import").send({
                filename: "translations.json",
                data: helper.getInvalidJsonBase64()
            });
            expect(response.status).toBe(400);
        });
    });
});