const ProductModel = require("../models/Product");

class ProductController {
  async index(req, res) {
    const products = await ProductModel.find({});
    res.send(products);
  }

  async store(req, res) {
    const record = req.body;
    try {
      await ProductModel.create(record);
      res.json({ status: "OK" });
    } catch (err) {
      console.log(err);
    }
  }

  async updated(req, res) {
    const { _id, name, description, category, brand } = req.body;

    try {
      const product = await ProductModel.findOne({ id: _id });
      const ProductName = name ?? product.name;
      const ProductDescription = description ?? product.description;
      const ProductCategory = category ?? product.category;
      const ProductBrand = brand ?? product.brand;

      await ProductModel.updateOne({
        name: ProductName,
        description: ProductDescription,
        category: ProductCategory,
        brand: ProductBrand,
      });

      res.send({ status: "OK" });
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req, res) {
    const { _id } = req.body;
    
    try {
      await ProductModel.deleteOne({ id: _id });

      res.send({ status: "OK" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new ProductController();
