const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  category: { type: String },
  brand: { type: String },
  price: { type: Number },
  inventory: { type: Number },
  date: {
    type: Number,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("Products", ProductSchema);

module.exports = ProductModel;
