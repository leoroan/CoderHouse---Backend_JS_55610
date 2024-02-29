import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController
} from "../controllers/products.controller.js";

const router = Router();

// Get all products
router.get('/', getAllProductsController);

// Obtener un producto por ID
router.get('/:id', getProductByIdController)

// Crear un nuevo producto
router.post('/', createProductController)

// Actualizar un producto por ID
router.put('/:id', updateProductController)

// Eliminar un producto por ID
router.delete('/:id', deleteProductController);

export default router;
