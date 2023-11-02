const fs = require("fs");

class Product {
  constructor(id, title, description, price, thumbnail, code, stock) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor(ruta, file) {
    this.path = ruta;
    this.fileName = path + file;
    if (fs.existsSync(fileName)) {
      try {
        let products = fs.readFileSync(fileName, "utf-8");
        this.products = JSON.parse(products);
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (this.isProductCodeDuplicate(code)) {
      throw new Error('Product code already exists');
    }

    const id = this.generateUniqueID();
    const newProduct = new Product(id, title, description, price, thumbnail, code, stock);

    try {
      this.products.push(newProduct);
      await this.saveProductsToFile(this.products);
    } catch (error) {
      throw new Error('Error writing file');
    }
  }

  isProductCodeDuplicate(code) {
    return this.products.find((product) => product.code === code);
  }

  generateUniqueID() {
    return Math.random().substring(2, 9);;
  }

  async saveProductsToFile(data) {
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(data)
      );
      return true;
    } catch (error) {
      throw new Error("something gone wrong saving..", error);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    if (typeof productId !== 'number') {
      throw new Error('Product ID must be a number');
    }

    if (!this.products.find(product => product.id === productId)) {
      throw new Error('Product not found');
    }

    return this.products.find(product => product.id === productId);
  }
}



// TESTs

const mngr = new ManagerUsuarios("./", "Productos.json");