const { Router } = require("express");
const ProductController = require("../controllers/ProductController");
const CategoryController = require("../controllers/CategoryController");
const router = Router();

/* PRODUCTS ROUTES */
router.get("/", ProductController.index);
router.post("/product/store", ProductController.store);
router.put("/product/update", ProductController.updated);
router.delete("/product/delete", ProductController.delete);

/* CATEGORY ROUTES */
router.get("/", CategoryController.index);
router.post("/category/store", CategoryController.store);
router.put("/category/update", CategoryController.updated);
router.delete("/category/delete", CategoryController.delete);

module.exports = router;
