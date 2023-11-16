import ProductManager from "../models/ProductManager.js";

const productManager = new ProductManager("./models/data/", "productos.json");
const products = productManager.getProducts();

const getProductByIdMiddleware = (req, res, next) => {
  try {
    const productId = parseInt(req.params.pid);
    const foundProduct = productManager.getProductById(productId);
    req.product = foundProduct;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error: ' + error.message });
  }
};

const getLimitMiddleware = (req, res, next) => {
  let { limit } = req.query;
  try {
    if (limit) {
      limit = parseInt(limit);
      const limitedProducts = products.slice(0, limit);
      req.products = limitedProducts;
      next();
    } else {
      req.products = products;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: 'Error: ' + error.message });
  }
}

export {
  getProductByIdMiddleware,
  getLimitMiddleware
}