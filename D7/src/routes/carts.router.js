import { Router } from "express";
import {
  getAllCartsController,
  getCartByIdController,
  getCartByUserIdController,
  createCartController,
  deleteWholeCartController,
  deleteProductFromCartByIdController,
  addProductToCartByIdController
} from "../controllers/carts.controller.js";

const router = Router();

// Get all carts
router.get('/', getAllCartsController);

// Get a cart by ID
router.get('/:id', getCartByIdController);

// Get a cart by user ID
router.get('/user/:uid', getCartByUserIdController);

// Agregar un producto al carrito por ID
router.put('/:cid/product/:pid/:qtty', addProductToCartByIdController);

// Eiminar un producto del carrito por ID
router.delete('/:cid/product/:pid', deleteProductFromCartByIdController);

// Eiminar todo el carrito
router.delete('/:cid/', deleteWholeCartController);

// Crear un nuevo carrito
router.post('/:uid', createCartController);

export default router;
