const request = require("supertest");
const app = require("../../app");

describe("Test User Routes", () => {
    test("/users", async () => {
        const response = await request(app).get("/users");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("respond with a resource");
    });
});