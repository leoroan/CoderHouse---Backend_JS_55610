import ProductManager from "../models/ProductManager.js";

const productManager = new ProductManager("./models/data/", "productos.json");

const getProductByIdMiddleware  = (req, res, next) => {
  try {
    const productId = parseInt(req.params.pid);
    const foundProduct = productManager.getProductById(productId);
    req.product = foundProduct;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error: ' + error.message });
  }
};

export {
  getProductByIdMiddleware
}