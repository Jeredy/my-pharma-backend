const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  inventory: { type: Number, required: true },
  date: {
    type: Number,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("Products", ProductSchema);

module.exports = ProductModel;
