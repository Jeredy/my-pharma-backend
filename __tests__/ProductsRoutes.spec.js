const express = require("express");
const app = new express();
const request = require("supertest");
const bodyParser = require("body-parser");
const router = require("../routes/main");

app.use("/", router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

describe("Testing Products Routes", function () {
  describe("Testing Products GET index", function () {
    it("should repond with a 200 status code", async () => {
      const res = await request(app).get("/");
      expect(res.header["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Testing Products POST store", function () {
    it("should respond with a 200 status code", async () => {
      const response = await request(app).post("/product/add-product").send({
        name: String,
        description: String,
        category: String,
        brand: String,
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
