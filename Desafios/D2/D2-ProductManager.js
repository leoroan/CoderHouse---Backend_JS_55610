const fs = require("fs");
// const path = require("path");

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
    // this.path = ruta;
    // this.fileName = path.join(this.path, file);
    this.fileName = (ruta + file);
    if (fs.existsSync(this.fileName)) {
      try {
        let products = fs.readFileSync(this.fileName, "utf-8");
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
    return Math.random().toString(36).substring(2, 9);
  }

  async saveProductsToFile(data) {
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(data, null, "\t")
      );
      // return true;
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
        throw new Error("something gone wrong retrieving data");
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

  updateProduct(id, newProduct) {
    try {
      const product = this.getProductById(id);
      if (typeof newProduct === 'object') {
        for (const key in newProduct) {
          if (key !== 'id') {
            if (newProduct.hasOwnProperty(key)) {
              product[key] = newProduct[key];
            } else {
              throw new Error(`Property '${key}' not found in the update data.`);
            }
          }
        }
        return product;
      } else {
        throw new Error('The data provided for update was not an object.');
      }
    } catch (error) {
      throw new Error('Error updating product: ' + error.message);
    }
  }

  deleteProduct(productId) {
    try {
      const products = this.getProducts();
      const index = products.findIndex(product => product.id === productId);

      if (index !== -1) {
        products.splice(index, 1);
        this.saveProductsToFile(products);
        return true;
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error('Error deleting product: ' + error.message);
    }
  }
}



// TESTs

// Se creará una instancia de la clase “ProductManager”
const mngr = new ProductManager("./", "Productos.json");

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(mngr.getProducts());

// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25
mngr.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
console.log(mngr.getProducts());

// Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
//sin error
console.log(mngr.getProductById(1));
//con error
console.log(mngr.getProductById(2));

// // Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
// mngr.updateProduct(1, { price: 350 });
// console.log(mngr.getProducts());

// // Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
// mngr.deleteProduct(5);
// mngr.deleteProduct(1);



