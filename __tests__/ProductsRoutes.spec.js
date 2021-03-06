const app = require("../server");
const request = require("supertest");
const ProductController = require("../controllers/ProductController");
const { connect, disconnect } = require("../db/connection");

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});

describe("Testing Products Routes", function () {
  let id = "";

  describe("Testing method INDEX", () => {
    it("should repond with a 200 status code", async () => {
      const res = await request(app).get("/product", ProductController.index);
      expect(res.header["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(res.statusCode).toBe(200);
    });

    it("shoud have products and totalPages as response", async () => {
      const res = await request(app).get("/product", ProductController.index);
      expect(res.body).toHaveProperty("products");
      expect(res.body).toHaveProperty("totalPages");
    });
  });

  describe("Testing method - STORE", () => {
    it("should response with a 200 status code", async () => {
      const res = await request(app)
        .post("/product/store", ProductController.store)
        .send({
          name: "test 1",
          description: "test 1",
          category: "test 1",
          brand: "test 1",
          price: 28.56,
          inventory: 30,
        })
        .set("Accept", "application/json");
      expect(res.body.response._id).not.toBeUndefined();
      id = res.body.response._id;
      expect(res.header["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Testing method - UDPATE", () => {
    it("should response with 200 status code", async () => {
      const res = await request(app)
        .put("/product/update", ProductController.update)
        .send({
          _id: id,
          name: "test 2",
          description: "test 2",
          category: "test 2",
          brand: "test 2",
          price: 12.56,
          inventory: 830,
        })
        .set("Accept", "application/json");
      expect(res.header["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Testing method - DELETE", () => {
    it("should resopnse with 200 status code", async () => {
      const data = {
        idList: JSON.stringify([id]),
      };
      const res = await request(app)
        .delete("/product/delete", ProductController.delete)
        .send(data)
        .set("Accept", "application/json");
      expect(res.header["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(res.statusCode).toBe(200);
    });
  });
});
