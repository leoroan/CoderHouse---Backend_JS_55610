
import CartManager from "../models/CartManager.js";

const cartManager = new CartManager("./models/data/", "cart.json");

const handleErrors = (res, error) => {
  res.status(500).json({ error: 'Error: ' + error.message });
};

// Get cart by id
const getCartByIdMiddleware = (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cid);
    const foundCart = cartManager.getCartById(cartId);
    req.cart = foundCart;
    next();
  } catch (error) {
    handleErrors(res, error);
  }
};

// Create cart
const postCartMiddleware = async (req, res, next) => {
  try {
    await cartManager.addCart();
    next();
  } catch (error) {
    handleErrors(res, error);
  }
};

// Add product to cart
const addProductToCartMiddleware = (req, res, next) => {
  const { cart, product } = req;
  cartManager.updateCart(cart, product);
  next();
};

export {
  getCartByIdMiddleware,
  postCartMiddleware,
  addProductToCartMiddleware
};
