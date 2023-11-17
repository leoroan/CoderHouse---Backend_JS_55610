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
  res.status(200).json({ products });
});

// Get a product by id
router.get("/:pid", getProductByIdMiddleware, (req, res) => {
  const { product } = req;
  res.status(200).json({ product });
});

// Post a product
router.post("/", postProductMiddleware, (req, res) => {
  // Assuming postProductMiddleware adds the product to the database
  res.status(201).json({ message: "Product created successfully", product: req.body });
});

// Update a product
router.put("/:pid", putProductMiddleware, (req, res) => {
  // Assuming putProductMiddleware updates the product in the database
  res.status(200).json({ message: "Product updated successfully" });
});

// Delete a product
router.delete("/:pid", deleteProductMiddleware, (req, res) => {
  // Assuming deleteProductMiddleware deletes the product from the database
  res.status(200).json({ message: "Product deleted successfully" });
});

export default router;
