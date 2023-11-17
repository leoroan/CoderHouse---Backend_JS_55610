import CartManager from "../models/cartManager.js";

const cartManager = new CartManager("./models/data/", "cart.json");
const cart = cartManager.getCarts();

const getCartByIdMiddleware = (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cid);
    const foundCart = cartManager.getCartById(cartId);
    req.cart = foundCart;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error: ' + error.message });
  }
};

export {
  getCartByIdMiddleware
}