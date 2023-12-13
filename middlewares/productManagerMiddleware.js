import ProductManager from "../src/dao/ProductManager.js";

const productManager = new ProductManager("../src/dao/data/", "productos.json");
const products = productManager.getProducts();

const handleErrors = (res, error) => {
  res.status(500).json({ error: 'Error: ' + error.message });
};

//get all products
const getAllProductsMiddleware  = async (req, res, next) => {
  try {
    const products = await productManager.getProducts();
    req.products = products;
    next();
  } catch (error) {
    handleErrors(res, error);
  }
};

// Get product by id
const getProductByIdMiddleware = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.pid);
    const foundProduct = await productManager.getProductById(productId);
    req.product = foundProduct;
    next();
  } catch (error) {
    handleErrors(res, error);
  }
};

// Get products limited
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
    handleErrors(res, error);
  }
};

// Add product
const postProductMiddleware = async (req, res, next) => {
  let { title, description, price, code, thumbnail, stock, category } = req.body;
  let product = { title, description, price, code, thumbnail, stock, category };
  try {
    await productManager.addProduct(product);
    next();
  } catch (error) {
    handleErrors(res, error);
  }
};

// Update product
const putProductMiddleware = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = req.body; // use req.body instead of req.query
    await productManager.updateProduct(productId, { ...product });
    next();
  } catch (error) {
    handleErrors(res, error);
  }
};

// Delete product
const deleteProductMiddleware = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.pid);
    await productManager.deleteProduct(productId);
    next();
  } catch (error) {
    handleErrors(res, error);
  }
};

export {
  getProductByIdMiddleware,
  getLimitMiddleware,
  postProductMiddleware,
  putProductMiddleware,
  deleteProductMiddleware,
  getAllProductsMiddleware
};
