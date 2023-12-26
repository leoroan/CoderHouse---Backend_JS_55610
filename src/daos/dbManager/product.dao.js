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
  async getAllProducts({ limit = 10, page = 1, sort = "asc", category = "all" }) {

    const filter = {
      status: true,
      category: category
    };

    const sorted = sort === "asc" ? 1 : -1;

    try {
      const result = await productModel.paginate(filter, { limit: limit, page: page, sort: { price: sorted } });
  
      if (page > result.totalPages) {
        throw new Error("Requested page exceeds total pages");
      }
  
      return result;
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