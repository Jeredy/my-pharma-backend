const BrandModel = require("../models/Brand");

class BrandController {
  async index(req, res) {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || "0");
    const total = await BrandModel.countDocuments({});

    const brands = await BrandModel.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.send({ brands, totalPages: Math.ceil(total / PAGE_SIZE) });
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
      const brand = await BrandModel.findById(_id)
      const BrandName = name ?? brand.name;
      const BrandDescription = description ?? brand.description;

      await BrandModel.where({ _id }).updateOne({
        name: BrandName,
        description: BrandDescription,
      });

      res.send({ status: "OK" });
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req, res) {
    const { idList } = req.body;
    const deleteList = JSON.parse(idList);

    try {
      await BrandModel.deleteMany({ _id: { $in: deleteList } });

      res.send({ status: "OK" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new BrandController();
