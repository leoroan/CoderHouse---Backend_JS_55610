import { Router } from "express";

const router = Router();

const products = [];

// Getting the products
router.get("/", (req, res) => {
  res.json({
    products,
  });
});