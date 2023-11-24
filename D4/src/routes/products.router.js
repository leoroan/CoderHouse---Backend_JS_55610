import { Router } from "express";
import {
  getProductByIdMiddleware,
  postProductMiddleware,
  getLimitMiddleware,
  putProductMiddleware,
  deleteProductMiddleware
} from '../../middlewares/productManagerMiddleware.js';

const router = Router();

// Get all products
router.get("/", getLimitMiddleware, (req, res) => {
  const { products } = req;
  res.render("products", {
    fileFavicon: "favicon.ico",
    fileCss: "styles.css",
    fileJs: "scripts.js",
    title: "Let´s go shopping",
    name: undefined,
    products: products,
  });
  res.status(200);
});

// Get a product by id
router.get("/:pid", getProductByIdMiddleware, (req, res) => {
  const { product } = req;
  res.status(200).json({ product });
});

// Post a product
router.post("/", postProductMiddleware, (req, res) => {
  res.status(201).json({ message: "Product created successfully", product: req.body });
});

// Update a product
router.put("/:pid", putProductMiddleware, (req, res) => {
  res.status(200).json({ message: "Product updated successfully" });
});

// Delete a product
router.delete("/:pid", deleteProductMiddleware, (req, res) => {
  res.status(200).json({ message: "Product deleted successfully" });
});

export default router;
