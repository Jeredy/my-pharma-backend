const CategoryModel = require("../models/Category");

class CategoryController {
  async index(req, res) {
    const categories = await CategoryModel.find({});
    res.send(categories);
  }

  async store(req, res) {
    const record = req.body;
    try {
      await CategoryModel.create(record);
      res.json({ status: "OK" });
    } catch (err) {
      console.log(err);
    }
  }

  async updated(req, res) {
    const { _id, name, description } = req.body;

    try {
      const category = await CategoryModel.findOne({ id: _id });
      const CategoryName = name ?? category.name;
      const CategoryDescription = description ?? category.description;

      await CategoryModel.updateOne({
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
