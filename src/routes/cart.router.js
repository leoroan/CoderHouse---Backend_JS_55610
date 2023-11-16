import { Router } from "express";

const router = Router();

const cart = [];

// Get the cart
router.get("/", (req, res) => {
  res.json({
    cart,
  });
});


export default router;