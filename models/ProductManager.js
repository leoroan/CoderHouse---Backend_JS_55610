import Product from './Product.js';
import fs from 'fs';

class ProductManager {
  constructor(route, file) {
    this.fileName = `${route}${file}`;
    this.initialize();
  }

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

  isProductCodeDuplicate(code) {
    return this.products.find((product) => product.code === code);
  }

  generateUniqueID() {
    const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }

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

  getProducts() {
    return this.products;
  }

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
