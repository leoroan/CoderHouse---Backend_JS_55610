import CartManager from "../models/CartManager.js";

const cartManager = new CartManager("./models/data/", "cart.json");

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

const postCartMiddleware = (req, res, next) => {
  try {
    cartManager.addCart();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error: ' + error.message });
  }
};

const addProductToCartMiddleware = async (req, res, next) => {
  const { cart, product } = req;
  cartManager.updateCart(cart, product);
  next();
}

export {
  getCartByIdMiddleware,
  postCartMiddleware,
  addProductToCartMiddleware
}