import CartDao from '../services/db/cart.dao.js'
const cartDao = new CartDao();

export const purchaseCartController = async (req, res) => {
  const cartId = req.params.id;
  //corroborar stock de productos
  //  pregutnar al product.controller por cada uno de ellos
  //  (le envio el arreglo de productos y que me devuelva lo q corresponda)
  //   un array de validos e invalidos
  //   en caso de continuar lo validos deben bajar stock
  // invalidos deben volver al carrito
  // total el base a los validos  
};

export const getAllCartsController = async (req, res) => {
  return await res.json(cartDao.getAllCarts());
};

export const getCartByIdController = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cart = await cartDao.getCartById(cartId);

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

export const getCartByUserIdController = async (req, res) => {
  const userId = req.params.uid;
  try {
    const cart = await cartDao.getCartByUserId(userId);
    if (!cart) {
      await cartDao.createCart(userId);
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
    const newCart = await cartDao.createCart(userID);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteWholeCartController = async (req, res) => {
  const cartID = req.params.cid;
  try {
    const updatedCart = await cartDao.deleteCart(cartID);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteProductFromCartByIdController = async (req, res) => {
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
}

export const addProductToCartByIdController = async (req, res) => {
  const anID = req.params.cid;
  const productID = req.params.pid;
  const qtty = req.params.qtty;
  try {
    const updatedCart = await cartDao.addProductToCart(anID, productID, qtty);
    if (!updatedCart) {
      return res.status(404).json({ error: 'carrito no actualizado' });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

