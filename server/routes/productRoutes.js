import express from "express";
import formidable from "express-formidable";
import { authenticate, authorizeAsAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { addProduct, updateProduct, deleteProduct, fetchProducts, fetchProductById, getAllProducts, addProductReview, fetchTopProducts, fetchNewProducts } from "../controllers/productController.js";

const router = express.Router();

router.route("/allproducts").get(getAllProducts)
router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAsAdmin, formidable(), addProduct);

  router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

  router.get("/top", fetchTopProducts);
  router.get("/new", fetchNewProducts);
  

router.route("/:id").put(authenticate, authorizeAsAdmin, formidable(), updateProduct).delete(authenticate, authorizeAsAdmin, deleteProduct)
.get(fetchProductById)

export default router;
