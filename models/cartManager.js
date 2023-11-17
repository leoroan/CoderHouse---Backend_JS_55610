import Cart from './Cart.js';
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
      const newCart = new Cart(id);
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
    const maxId = this.cart.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
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

  getCarts() {
    if (fs.existsSync(this.fileName)) {
      try {
        let carts = fs.readFileSync(this.fileName, "utf-8");
        this.carts = JSON.parse(carts);
        return this.carts;
      } catch {
        throw new Error("something gone wrong retrieving data, or empty file");
      }
    }
    else return this.products;
  }

  getCartById(cartId) {
    try {
      if (typeof cartId !== 'number' || isNaN(cartId)) {
        throw new Error('cartID must be a valid number');
      }
      const carts = this.getCarts();
      const cart = carts.find(cart => cart.id === cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }
      return cart;
    } catch (error) {
      throw new Error('Error in getCartById: ' + error.message);
    }
  }

  async updateCart(cart, product) {
    const existingItem = cart.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ id: product.id, quantity: 1 });
    };
    const cartIndex = this.cart.findIndex(c => c.id === cart.id);
    this.cart[cartIndex] = cart;
    await this.saveCartsToFile(this.cart);
  }

}

export default CartManager;