import Cart from './Cart.js';
import fs from 'fs';

class CartManager {
  constructor(route, file) {
    this.fileName = `${route}${file}`;
    this.initialize();
  }

  initialize() {
    if (fs.existsSync(this.fileName)) {
      try {
        const data = fs.readFileSync(this.fileName, 'utf-8');
        this.carts = JSON.parse(data) || [];
      } catch (error) {
        console.error('Error reading cart file:', error);
        this.carts = [];
      }
    } else {
      this.carts = [];
    }
  }

  async addCart() {
    try {
      const id = this.generateUniqueID();
      const newCart = new Cart(id);
      this.carts.push(newCart);
      await this.saveCartsToFile(this.carts);
    } catch (error) {
      console.error('Error adding cart:', error);
      throw new Error('Failed to create cart');
    }
  }

  generateUniqueID() {
    const maxId = this.carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
    return maxId + 1;
  }

  async saveCartsToFile(data) {
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(data, null, '\t')
      );
    } catch (error) {
      console.error('Error saving carts to file:', error);
      throw new Error('Failed to save carts to file');
    }
  }

  getCarts() {
    return this.carts;
  }

  getCartById(cartId) {
    try {
      if (typeof cartId !== 'number' || isNaN(cartId)) {
        throw new Error('cartID must be a valid number');
      }
      const cart = this.carts.find((cart) => cart.id === cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }
      return cart;
    } catch (error) {
      console.error('Error in getCartById:', error);
      throw new Error('Failed to get cart by ID');
    }
  }

  async updateCart(cart, product) {
    const existingItem = cart.items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ id: product.id, quantity: 1 });
    }
    const cartIndex = this.carts.findIndex((c) => c.id === cart.id);
    this.carts[cartIndex] = cart;
    await this.saveCartsToFile(this.carts);
  }
}

export default CartManager;
