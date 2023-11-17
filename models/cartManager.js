import fs from 'fs';

class CartManager {
  constructor(rute, file) {
    this.fileName = `${rute}${file}`;
    if (fs.existsSync(this.fileName)) {
      try {
        this.cart = JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
      } catch {
        this.cart = [];
      }
    }
  }

  async addCart() {
    try {
      const id = this.generateUniqueID();
      const newCart = new this.cart(id);
      this.cart.push(newCart);
      try {
        await this.saveCartsToFile(this.cart);
      } catch (error) {
        throw new Error('Failed to save cart to file');
      }
    } catch (error) {
      throw new Error('An unexpected error occurred while creating cart');
    }
  }

  generateUniqueID() {
    const maxId = this.cart.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }

  async saveCartsToFile(data) {
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(data, null, "\t")
      );
    } catch (error) {
      throw new Error("something gone wrong saving", error);
    }
  }

  getCartById() {
    if (fs.existsSync(this.fileName)) {
      try {
        let carts = fs.readFileSync(this.fileName, "utf-8");
        this.carts = JSON.parse(carts);
        return this.carts;
      } catch {
        throw new Error("something gone wrong retrieving data, or empty file");
      }
    }
    else return this.cart;
  }
}


export default CartManager;