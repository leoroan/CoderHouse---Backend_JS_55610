import { Router } from "express";
import CartDao from "../daos/dbManager/cart.dao.js"

const router = Router();
const cartDao = new CartDao();

// Get all carts
router.get('/', async (req, res) => {
  try {
    const carts = await cartDao.getAllCarts();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a cart by ID
router.get('/:id', async (req, res) => {
  const cartId = req.params.id;

  try {
    const cart = await cartDao.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carro no encontrado' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un producto al carrito por ID
router.put('/:cid/product/:pid/:qtty', async (req, res) => {
  const cartID = req.params.cid;
  const productID = req.params.pid;
  const qtty = req.params.qtty;

  try {
    const updatedCart = await cartDao.addProductToCart(cartID, productID, qtty);

    if (!updatedCart) {
      return res.status(404).json({ error: 'carrito no actualizado' });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eiminar un producto del carrito por ID
router.delete('/:cid/product/:pid', async (req, res) => {
  const cartID = req.params.cid;
  const productID = req.params.pid;

  try {
    const updatedCart = await cartDao.deleteProductFromCart(cartID, productID);

    if (!updatedCart) {
      return res.status(404).json({ error: 'carrito no actualizado' });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eiminar todo el carrito
router.delete('/:cid/', async (req, res) => {
  const cartID = req.params.cid;

  try {
    const updatedCart = await cartDao.deleteCart(cartID);

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo carrito
router.post('/:uid', async (req, res) => {
  const userID = req.params.uid;
  try {
    const newCart = await cartDao.createCart(userID);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;
