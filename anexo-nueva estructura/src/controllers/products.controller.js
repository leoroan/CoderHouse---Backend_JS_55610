import ProductDAO from "../services/db/product.dao.js";
// import { ProductDTO } from "../services/db/dto/product.dto.js";
const productDao = new ProductDAO();

//Get all products
export const getAllProductsController = async (req, res) => {
  const { limit, page, sort, category } = req.query;
  try {
    const products = await productDao.getAllProducts({ limit, page, sort, category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get product by id
export const getProductByIdController = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productDao.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    // const productDTO = new ProductDTO(product._id, product.id, product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.category, product.status)
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new product
export const createProductController = async (req, res) => {
  const newProductData = req.body;
  try {
    const newProduct = await productDao.addProduct(newProductData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ID
export const updateProductController = async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;
  try {
    const updatedProduct = await productDao.updateProduct(productId, updatedProductData);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product by ID
export const deleteProductController = async (req, res) => {
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
};

// Update stock of a product by ID
export const updateStockController = async (prod, qtty) => {
  const productId = prod._id;
  const actualStock = prod.stock;
  const updatedStock = actualStock - qtty;
  try {
    const updatedProduct = await productDao.updateStock(productId, updatedStock);
    if (!updatedProduct) {
      console.log("couldnt update stock from model");
    }
    console.log("stock updated");
    console.log("producto :", prod.title," stock_actual: ", actualStock, " stock_nuevo: ", updatedStock);
  } catch (error) {
    console.log("error in update stock controller", error);
  }
};