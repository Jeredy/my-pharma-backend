const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: {
    type: Number,
    default: Date.now,
  },
});

const BrandModel = mongoose.model("Brand", BrandSchema);

module.exports = BrandModel;
