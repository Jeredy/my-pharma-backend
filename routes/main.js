const { Router } = require("express");
const ProductController = require("../controllers/ProductController");
const CategoryController = require("../controllers/CategoryController");
const BrandController = require("../controllers/BrandController");

const router = Router();

/* PRODUCTS ROUTES */
router.get("/product", ProductController.index);
router.post("/product/store", ProductController.store);
router.put("/product/update", ProductController.updated);
router.delete("/product/delete", ProductController.delete);

/* CATEGORY ROUTES */
router.get("/category", CategoryController.index);
router.post("/category/store", CategoryController.store);
router.put("/category/update", CategoryController.updated);
router.delete("/category/delete", CategoryController.delete);

/* BRAND ROUTES */
router.get("/brand", BrandController.index);
router.post("/brand/store", BrandController.store);
router.put("/brand/update", BrandController.updated);
router.delete("/brand/delete", BrandController.delete);

module.exports = router;
