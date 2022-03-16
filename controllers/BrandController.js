const BrandModel = require("../models/Brand");

class BrandController {
  async index(req, res) {
    const brands = await BrandModel.find({});
    res.send(brands);
  }

  async store(req, res) {
    const record = req.body;
    try {
      await BrandModel.create(record);
      res.json({ status: "OK" });
    } catch (err) {
      console.log(err);
    }
  }

  async updated(req, res) {
    const { _id, name, description } = req.body;

    try {
      const brand = await BrandModel.findOne({ id: _id });
      const BrandName = name ?? brand.name;
      const BrandDescription = description ?? brand.description;

      await BrandModel.updateOne({
        name: BrandName,
        description: BrandDescription,
      });

      res.send({ status: "OK" });
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req, res) {
    const { _id } = req.body;
    
    try {
      await BrandModel.deleteOne({ id: _id });

      res.send({ status: "OK" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new BrandController();
