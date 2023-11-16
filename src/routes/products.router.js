import { Router } from "express";

const router = Router();

const products = [];

// Get the products
router.get("/", (req, res) => {
  res.json({
    products,
  });
});


export default router;