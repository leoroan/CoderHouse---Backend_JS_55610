import { Router } from "express";
import ProductDAO from "../daos/dbManager/product.dao.js";

const router = Router();

const dao = new ProductDAO();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await dao.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
