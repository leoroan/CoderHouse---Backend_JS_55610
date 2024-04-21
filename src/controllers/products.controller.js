import CustomError from "../services/errors/CustomErrors.js";
import EErrors from "../services/errors/errors-nums.js";
import { generateProductValidationErrorInfo } from "../services/errors/products-error.messages.js";
import { productService } from "../services/repository/services.js";

export const getAllProductsController = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProductsLegacy();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function checkOwnership(prodOwnerId, actualUserId) {
  return prodOwnerId === actualUserId;
}

//Get product by id
export const getProductByIdController = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.getProductById(productId);
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
  try {
    const newProductData = req.body;
    const { title, description, price, code } = newProductData;
    if (!title || !description || !price || !code) {
      CustomError.createError({
        name: "Product Create Error",
        cause: generateProductValidationErrorInfo(newProductData),
        message: "Error trying to create the product. Required fields are missing.",
        code: EErrors.INVALID_TYPES_ERROR
      });
    }
    const newProduct = await productService.addProduct(newProductData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error.cause);
    res.status(500).json({ error: error.code, message: error.message });
  }
};

// Update a product by ID
export const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;
    const { title, description, price, code } = updatedProductData;
    if (!title || !description || !price || !code) {
      CustomError.createError({
        name: "Product Update Error",
        cause: generateProductValidationErrorInfo(updatedProductData),
        message: "Error trying to Update the product. Required fields are missing.",
        code: EErrors.INVALID_TYPES_ERROR
      });
    }

    const updatedProduct = await productService.updateProduct(productId, updatedProductData);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(201).json(updatedProduct);
  } catch (error) {
    console.error(error.cause);
    res.status(500).json({ error: error.code, message: error.message });
  }
};

// Delete a product by ID
export const deleteProductController = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await productService.deleteProduct(productId);
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
    const updatedProduct = await productService.updateStock(productId, updatedStock);
    if (!updatedProduct) {
      console.log("couldnt update stock from model");
    }
    console.log("producto :", prod.title, " stock_actual: ", actualStock, " stock_nuevo: ", updatedStock);
  } catch (error) {
    console.log("error in update stock controller", error);
  }
};