const ProductModel = require("../models/Product");

class ProductController {
  async index(req, res) {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || "0");
    const total = await ProductModel.countDocuments({});
    const { name, category, brand } = req.query;
    console.log({ name, category, brand });
    const searchQuery =
      name && category && brand
        ? {
            name: { $regex: name },
            category: { $regex: category },
            brand: { $regex: brand },
          }
        : name && category
        ? { name: { $regex: name }, category: { $regex: category } }
        : name && brand
        ? { name: { $regex: name }, brand: { $regex: brand } }
        : brand && category
        ? { brand: { $regex: brand }, category: { $regex: category } }
        : name
        ? { name: { $regex: name } }
        : category
        ? { category: { $regex: category } }
        : brand
        ? { brand: { $regex: brand } }
        : {};

    const products = await ProductModel.find(searchQuery)
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.send({ products, totalPages: Math.ceil(total / PAGE_SIZE) });
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
    const { _id, name, description, category, brand, price, inventory } =
      req.body;

    try {
      const product = await ProductModel.findById(_id);

      console.log(product);
      const ProductName = name ?? product.name;
      const ProductDescription = description ?? product.description;
      const ProductCategory = category ?? product.category;
      const ProductBrand = brand ?? product.brand;
      const ProductPrice = price ?? product.price;
      const ProductInventory = inventory ?? product.inventory;

      await ProductModel.where({ _id }).updateOne({
        name: ProductName,
        description: ProductDescription,
        category: ProductCategory,
        brand: ProductBrand,
        price: ProductPrice,
        inventory: ProductInventory,
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
      await ProductModel.deleteMany({ _id: { $in: deleteList } });

      res.send({ status: "OK" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new ProductController();
