const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  category: { type: String },
  brand: { type: String },
  date: {
    type: Number,
    default: Date.now
  }
});

const ProductModel = mongoose.model("Products", ProductSchema);

module.exports = ProductModel;
