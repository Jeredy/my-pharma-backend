const { Router } = require("express");
const ProductController = require("../controllers/ProductController");
const CategoryController = require("../controllers/CategoryController");
const BrandController = require("../controllers/BrandController");
const AdminController = require("../controllers/AdminController");

const router = Router();

/* PRODUCTS ROUTES */
router.get("/product", ProductController.index);
router.post("/product/store", ProductController.store);
router.put("/product/update", ProductController.update);
router.delete("/product/delete", ProductController.delete);

/* CATEGORY ROUTES */
router.get("/category", CategoryController.index);
router.post("/category/store", CategoryController.store);
router.put("/category/update", CategoryController.update);
router.delete("/category/delete", CategoryController.delete);

/* BRAND ROUTES */
router.get("/brand", BrandController.index);
router.post("/brand/store", BrandController.store);
router.put("/brand/update", BrandController.update);
router.delete("/brand/delete", BrandController.delete);

/* ADMIN ROUTES */
router.post("/signin", AdminController.index);
router.post("/signup", AdminController.store);
module.exports = router;
