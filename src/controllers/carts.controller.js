import { cartService } from '../services/repository/services.js';
import { updateStockController } from './products.controller.js';
import { createTicket } from '../controllers/tickets.controller.js';
import { sendMail, mensajeCompra } from './nodemailer.controller.js';

export const purchaseCartController = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productsFromCart = await getProductsFromCartById(cartId);
    const { validProducts, invalidProducts } = evaluateStock(productsFromCart);
    let grandTotal = 0;
    for (const product of validProducts) {
      grandTotal += product.productId.price * product.quantity;
      await updateStockController(product.productId, product.quantity);
      const reqs = { cid: cartId, pid: product.productId };
      await deleteProductFromCartByIdController(reqs, res);
    }
    if (validProducts.length > 0) {
      const ticket = { amount: grandTotal, purchaser: req.session.user.username };
      const createdTicket = await createTicket(ticket, res);
      sendMail(req.session.user.email, " compra realizada ", mensajeCompra(req.session.user.username, grandTotal, "code"));
    } else {
    }
  } catch (error) {
    console.error("Error en purchaseCartController:", error);
  };
}


function evaluateStock(productsFromCart) {
  const validProducts = [];
  const invalidProducts = [];
  productsFromCart.forEach((product) => {
    if (product.quantity <= product.productId.stock) {
      validProducts.push(product);
    } else {
      invalidProducts.push(product);
    }
  });
  return { validProducts, invalidProducts };
}

export const getAllCartsController = async (req, res) => {
  const carts = await cartService.getAllCarts();
  return res.json(carts);
};

export const getCartByIdController = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cart = await cartService.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carro no encontrado' });
    }
    res.render("cart", {
      fileFavicon: "favicon.ico",
      fileCss: "styles.css",
      fileJs: "main.scripts.js",
      title: " Shop Cart",
      name: "admin",
      admin: true,
      cart: cart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartById = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cart = await cartService.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carro no encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartByUserIdController = async (req, res) => {
  const userId = req.params.uid;
  try {
    const cart = await cartService.getCartByUserId(userId);
    if (!cart) {
      await cartService.createCart(userId);
    }
    res.render("cart", {
      fileFavicon: "favicon.ico",
      fileCss: "styles.css",
      fileJs: "main.scripts.js",
      title: " Shop Cart",
      user: req.session.user,
      cart: cart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const createCartController = async (req, res) => {
  const userID = req.params.uid;
  try {
    const newCart = await cartService.createCart(userID);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteWholeCartController = async (req, res) => {
  const cartID = req.params.cid;
  try {
    const updatedCart = await cartService.deleteCart(cartID);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteProductFromCartByIdController = async (req, res) => {
  // console.log(req.params.cid, req.params.pid);
  const cartID = req.params ? req.params.cid : req.cid;
  const productID = req.params ? req.params.pid : req.pid._id;
  try {
    const updatedCart = await cartService.deleteProductFromCart(cartID, productID);
    if (!updatedCart) {
      // return res.status(404).json({ error: 'carrito no actualizado' });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    // res.status(500).json({ error: error.message });
  }
}

export const addProductToCartByIdController = async (req, res) => {
  const anID = req.params.cid;
  const productID = req.params.pid;
  const qtty = req.params.qtty;
  try {
    const updatedCart = await cartService.addProductToCart(anID, productID, qtty);
    if (!updatedCart) {
      return res.status(404).json({ error: 'carrito no actualizado' });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProductsFromCartById(cartId) {
  try {
    const cart = await cartService.getCartById(cartId);
    if (!cart) {
      console.error("Cart not found for ID:", cartId);
      return res.status(404).json({ error: "Cart not found" });
    }
    return cart.products;
  } catch (error) {
    console.error("Error while getting products for cart with ID:", cartId, error);
    return res.status(500).json({ error: error.message });
  }
}