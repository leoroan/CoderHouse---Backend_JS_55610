import { Router } from "express";
import { getProductByIdMiddleware, postProductMiddleware, getLimitMiddleware, putProductMiddleware, deleteProductMiddleware } from '../../middlewares/productManagerMiddleware.js';

const router = Router();

//Get all products
router.get("/", getLimitMiddleware, (req, res) => {
  const { products } = req;
  res.json({ products });
});

//Get a product by id
router.get("/:pid", getProductByIdMiddleware, (req, res) => {
  const { product } = req;
  res.json({ product });
});

//Post a product
router.post("/", postProductMiddleware, (req, res) => {
  res.json(req.body);
});

//Update a product
router.put("/:pid", putProductMiddleware, (req, res) => {
  res.send("updated");
});

//Delete a product
router.delete("/:pid", deleteProductMiddleware, (req, res) => {
  res.json("deleted");
});

export default router;