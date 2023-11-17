import Product from './Product.js';
import fs from 'fs';

class ProductManager {
  constructor(rute, file) {
    this.fileName = `${rute}${file}`;
    if (fs.existsSync(this.fileName)) {
      try {
        this.products = JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
      } catch {
        this.products = [];
      }
    }
  }

  async addProduct(productData) {
    try {
      if (typeof productData === 'object') {
        const { title, description, price, thumbnail, code, stock, category } = productData;
        if (!title || !description || !price || !code || !stock || !category) {
          throw new Error("All fields are required. Please complete everyone.");
        }
        if (this.isProductCodeDuplicate(code)) {
          throw new Error('Product code already exists');
        }
        const id = this.generateUniqueID();
        const newProduct = new Product(id, title, description, price, thumbnail, code, stock);
        this.products.push(newProduct);
        try {
          await this.saveProductsToFile(this.products);
        } catch (error) {
          throw new Error('Failed to save products to file');
        }
      } else {
        throw new Error('Product data must be an object');
      }
    } catch (error) {
      throw new Error('An unexpected error occurred while creating product');
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
        JSON.stringify(data, null, "\t")
      );
    } catch (error) {
      throw new Error("something gone wrong saving", error);
    }
  }

  getProducts() {
    if (fs.existsSync(this.fileName)) {
      try {
        let prods = fs.readFileSync(this.fileName, "utf-8");
        this.prods = JSON.parse(prods);
        return this.prods;
      } catch {
        throw new Error("something gone wrong retrieving data, or empty file");
      }
    }
    else return this.products;
  }

  getProductById(productId) {
    try {
      if (typeof productId !== 'number' || isNaN(productId)) {
        throw new Error('Product ID must be a valid number');
      }
      const prods = this.getProducts();
      const product = prods.find(product => product.id === productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error('Error in getProductById: ' + error.message);
    }
  }

  async updateProduct(id, newProduct) {
    try {
      const productIndex = this.products.findIndex(product => product.id === id);
      if (productIndex !== -1) {
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
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error('Error updating product: ' + error.message);
    }
  }


  async deleteProduct(productId) {
    try {
      const products = this.getProducts();
      const index = products.findIndex(product => product.id === productId);

      if (index !== -1) {
        products.splice(index, 1);
        await this.saveProductsToFile(products);
        return true;
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error('Error deleting product: ' + error.message);
    }
  }
}

export default ProductManager;