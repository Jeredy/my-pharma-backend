const mongoose = require("mongoose");
const express = require("express");
const app = new express();
const request = require("supertest");
const bodyParser = require("body-parser");
const router = require("../routes/main");
const ProductController = require("../controllers/ProductController");
const cors = require("cors");

app.use("/", router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

describe("Testing Products Routes", function () {
  beforeAll(async () => {
    await require("../index");
  });

  it("should repond with a 200 status code to INDEX", async () => {
    const res = await request(app).get("/product", ProductController.index);
    expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
    expect(res.statusCode).toBe(200);
  });
});
