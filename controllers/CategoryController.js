const CategoryModel = require("../models/Category");

class CategoryController {
  async index(req, res) {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || "0");
    const total = await CategoryModel.countDocuments({});
    const { name, description } = req.query;

    const searchQuery =
      name && description
        ? { name: { $regex: name }, description: { $regex: description } }
        : description
        ? { description: { $regex: description } }
        : name
        ? { name: { $regex: name } }
        : {};

    const categories = await CategoryModel.find(searchQuery)
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.send({ categories, totalPages: Math.ceil(total / PAGE_SIZE) });
  }

  async store(req, res) {
    const record = req.body;
    try {
      const response = await CategoryModel.create(record);
      res.json({ status: "OK", response });
    } catch (err) {
      console.log(err);
    }
  }

  async update(req, res) {
    const { _id, name, description } = req.body;

    try {
      const category = await CategoryModel.findById(_id);
      const CategoryName = name ?? category.name;
      const CategoryDescription = description ?? category.description;

      await CategoryModel.where({ _id }).updateOne({
        name: CategoryName,
        description: CategoryDescription,
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
      await CategoryModel.deleteMany({ _id: { $in: deleteList } });

      res.send({ status: "OK" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new CategoryController();
