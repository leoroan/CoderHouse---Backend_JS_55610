import { Router } from "express";
import ProductDAO from "../daos/dbManager/product.dao.js";

const router = Router();
const productDao = new ProductDAO();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productDao.getAllProducts(limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await productDao.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const newProductData = req.body;

  try {
    const newProduct = await productDao.addProduct(newProductData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto por ID
router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;

  try {
    const updatedProduct = await productDao.updateProduct(productId, updatedProductData);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await productDao.deleteProduct(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
