import { Router } from "express";

const router = Router();

const cart = [];

// Getting the cart
router.get("/", (req, res) => {
  res.json({
    cart,
  });
});