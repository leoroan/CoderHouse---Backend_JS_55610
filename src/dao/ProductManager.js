import Product from './Product.js';
import fs from 'fs';
import { v4 } from 'uuid';

class ProductManager {
  constructor(route, file) {
    this.fileName = `${route}${file}`;
    this.initialize();
  }

  /*
  * Initialize the product manager
  * If the file exists, read the data and set the products property
  * If the file does not exist, set the products property to an empty array
  * 
  */
  initialize() {
    if (fs.existsSync(this.fileName)) {
      try {
        const data = fs.readFileSync(this.fileName, 'utf-8');
        this.products = JSON.parse(data) || [];
      } catch (error) {
        console.error('Error reading product file:', error);
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }

  /**
  * Add a new product
  * productData: an object containing the product data
  * Validate the product data
  * Check if the product code already exists
  * Generate a unique ID for the product
  * Create a new Product object with the product data
  * Add the new product to the products array
  * Save the products array to the file
  * If any of the validation or file operations fail, throw an error
  * 
  * Example usage:
  * const productData = {
  *   title: 'Product 1',
  *   description: 'Description of product 1',
  *   price: 100,
  *   thumbnail: 'thumbnail.jpg',
  *   code: 'ABC123',
  *   stock: 10,
  *   category: 'Category 1'
  * }
  * @param {*} productData 
  */
  async addProduct(productData) {
    try {
      this.validateProductData(productData);
      const { title, description, price, thumbnail, code, stock, category } = productData;
      if (this.isProductCodeDuplicate(code)) {
        throw new Error('Product code already exists');
      }
      const id = this.generateUniqueID();
      const newProduct = new Product(id, title, description, price, thumbnail, code, stock, category);
      this.products.push(newProduct);
      await this.saveProductsToFile(this.products);
    } catch (error) {
      console.error('Error adding product:', error);
      throw new Error('Failed to add product');
    }
  }

  /**
   * Validate the product data
   * productData: an object containing the product data
   * Check if the product data is an object
   * Check if all required fields are present
   * If any of the validation fails, throw an error
   *  
   * @param {*} productData 
   */
  validateProductData(productData) {
    if (typeof productData !== 'object') {
      throw new Error('Product data must be an object');
    }

    const requiredFields = ['title', 'description', 'price', 'code', 'stock', 'category'];
    for (const field of requiredFields) {
      if (!productData[field]) {
        throw new Error(`Field '${field}' is required. Please complete everyone.`);
      }
    }
  }

  /**
   * Check if the product code already exists
   * code: the product code to check
   * Iterate through the products array and check if any product has the same code
   * If a product with the same code is found, return true
   * Otherwise, return false
   * @param {*} code 
   * @returns boolean
   */
  isProductCodeDuplicate(code) {
    return this.products.find((product) => product.code === code);
  }

  /**
   * Generate a unique ID for the product
   * @returns 
   */
  generateUniqueID() {
    //   const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    //   return maxId + 1;
    return v4();
  }

  /**
   * Save the products array to the file
   * data: the products array to save
   * Convert the products array to a JSON string
   * Write the JSON string to the file
   * If any of the file operations fail, throw an error
   * @param {*} data 
   */
  async saveProductsToFile(data) {
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(data, null, '\t')
      );
    } catch (error) {
      console.error('Error saving products to file:', error);
      throw new Error('Failed to save products to file');
    }
  }

  /**
   * Get all products
   * @returns 
   */
  getProducts() {
    return this.products;
  }

  /**
   * Get a product by ID
   * productId: the ID of the product to get
   * Validate the product ID
   * Check if the product exists
   * If the product exists, return it
   * Otherwise, throw an error
   * @param {*} productId 
   * @returns 
   */
  getProductById(productId) {
    try {
      if (typeof productId !== 'number' || isNaN(productId)) {
        throw new Error('Product ID must be a valid number');
      }
      const product = this.products.find((product) => product.id === productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      console.error('Error in getProductById:', error);
      throw new Error('Failed to get product by ID');
    }
  }

  /**
   * Update a product by ID
   * id: the ID of the product to update
   * newProduct: the new product data
   * Validate the new product data
   * Check if the product exists and the new product code is unique
   * If the product exists and the new product code is unique, update the product
   * Otherwise, throw an error
   * 
   * Example usage:
   * const newProduct = {
   *   title: 'Updated Product',
   *   description: 'Updated description',
   *   price: 200,
   *   thumbnail: 'updated-thumbnail.jpg',
   *   code: 'XYZ789',
   *   stock: 20,
   *   category: 'Updated Category'
   * }
   * 
   * @param {*} id 
   * @param {*} newProduct 
   */
  async updateProduct(id, newProduct) {
    try {
      const productIndex = this.products.findIndex((product) => product.id === id);
      if (productIndex !== -1 && !this.isProductCodeDuplicate(newProduct.code)) {
        const product = { ...this.products[productIndex] };
        if (typeof newProduct === 'object' && Object.keys(newProduct).length > 0) {
          for (const key in newProduct) {
            if (key !== 'id' && newProduct[key] !== undefined) {
              product[key] = newProduct[key];
            }
          }
          this.products[productIndex] = product;
          await this.saveProductsToFile(this.products);
        } else {
          throw new Error('The data provided for update was not an object.');
        }
      } else {
        throw new Error('Product not found or duplicated codes');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  }


  /**
   * Delete a product by ID
   * productId: the ID of the product to delete
   * Validate the product ID
   * Check if the product exists
   * If the product exists, delete it from the products array and save the updated array
   * Otherwise, throw an error
   * 
   * @param {*} productId 
   * @returns 
   */
  async deleteProduct(productId) {
    try {
      const index = this.products.findIndex((product) => product.id === productId);
      if (index !== -1) {
        const updatedProducts = this.products.filter((product) => product.id !== productId);
        await this.saveProductsToFile(updatedProducts);
        return true;
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  }
}

export default ProductManager;
