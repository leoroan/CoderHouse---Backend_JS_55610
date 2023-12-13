import { productModel } from "../../model/product.model.js";

class ProductDAO {
  // Insert a new product
  async addProduct(productData) {
    try {
      await productModel.create(productData);
    } catch (error) {
      throw error;
    }
  }

  // Retrieve all products
  async getAllProducts(limit) {
    try {
      if (limit) {
        return await productModel.find().limit(limit);
      }
      return await productModel.find();
    } catch (error) {
      throw error;
    }
  }

  // Retrieve a product by ID
  async getProductById(productId) {
    try {
      return await productModel.findById(productId);
    } catch (error) {
      throw error;
    }
  }

  // Update a product by ID
  async updateProduct(productId, updatedData) {
    try {
      return await productModel.findByIdAndUpdate(productId, updatedData)
    } catch (error) {
      throw error;
    }
  }

  // Delete a product by ID
  async deleteProduct(productId) {
    try {
      return await productModel.findByIdAndDelete(productId);
    } catch (error) {
      throw error;
    }
  }
}

export default ProductDAO;