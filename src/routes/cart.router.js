import { Router } from "express";
import {
  getCartByIdMiddleware,
  postCartMiddleware,
  addProductToCartMiddleware
} from "../../middlewares/cartManagerMiddleware.js";

import { getProductByIdMiddleware } from '../../middlewares/productManagerMiddleware.js';

const router = Router();

// Get the cart by id
router.get("/:cid", getCartByIdMiddleware, (req, res) => {
  const { cart } = req;
  res.status(200).json({ cart });
});

// Add to the cart
router.post("/", postCartMiddleware, (req, res) => {
  res.status(201).json({ message: 'Cart created successfully', cart: req.body });
});

// Add product to the cart
router.post("/:cid/product/:pid", getCartByIdMiddleware, getProductByIdMiddleware, addProductToCartMiddleware, (req, res) => {
  res.status(200).json({ message: 'Product added to cart', cart: req.cart });
});

export default router;
