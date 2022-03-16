const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  date: {
    type: Number,
    default: Date.now,
  },
});

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
