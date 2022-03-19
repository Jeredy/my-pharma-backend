const app = require("../server");
const request = require("supertest");
const CategoryController = require("../controllers/CategoryController");
const { connect, disconnect } = require("../db/connection");

beforeAll(() => {
  connect();
});

afterAll(() => {
  disconnect();
});

describe("Testing Category Routes", () => {
  let id = "";

  describe("Testing method - INDEX", () => {
    it("Should respond with 200 status code", async () => {
      const res = await request(app).get("/category", CategoryController.index);
      expect(res.header["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Testing method - STORE", () => {
    it("Should respond with 200 status code", async () => {
      const res = await request(app)
        .post("/category/store", CategoryController.store)
        .send({
          name: "test 1",
          description: "test 1",
        })
        .set("Access", "application/json");
      id = res.body.response._id;
      expect(res.header["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(res.statusCode).toBe(200);
    });
  });


  describe("Testing method - UDPATE", () => {
    it("Should response with 200 status code", async () => {
      const res = await request(app)
        .put("/category/update", CategoryController.update)
        .send({
          _id: id,
          name: "test 2",
          description: "test 2",
        })
        .set("Accept", "application/json");
      expect(res.header["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Testing method - DELETE", () => {
    it("Should respond with 200 status code", async () => {
      const data = {
        idList: JSON.stringify([id]),
      };
      const res = await request(app)
        .delete("/category/delete", CategoryController.delete)
        .send(data)
        .set("Access", "application/json");
      expect(res.header["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(res.statusCode).toBe(200);
    });
  });
});
