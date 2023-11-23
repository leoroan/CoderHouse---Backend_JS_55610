import Cart from './Cart.js';
import fs from 'fs';
import { uuid } from 'uuidv4';

class CartManager {
  constructor(route, file) {
    this.fileName = `${route}${file}`;
    this.initialize();
  }

  /**
   * Initialize the cart manager by reading the cart file if it exists.
   * If the file does not exist, create an empty array to store the carts.
   * If the file exists but cannot be read, log an error and use an empty array.
   * @returns {void}
   */
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

  /**
   * Add a new cart to the array of carts.
   * Generate a unique ID for the new cart.
   * Create a new Cart object with the generated ID.
   * Add the new cart to the array of carts.
   * Save the updated array of carts to the file.
   * If any error occurs during the process, log it and throw an error.
   
   * @returns {void}
   */
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

  /**
   * Generate a unique ID for a new cart.
   * @returns 
   */
  generateUniqueID() {
    // const maxId = this.carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
    // return maxId + 1;
    return uuid();
  }

  /**
   * Save the carts array to the file.
   * Convert the carts array to a JSON string.
   * Write the JSON string to the file.
   * If any of the file operations fail, log the error and throw an error.
   * @param {*} data 
   */
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

  /**
   * Get all the carts in the array of carts.
   * @returns 
   */
  getCarts() {
    return this.carts;
  }

  /**
   * Get a cart by its ID.
   * Validate the cart ID.
   * Check if the cart exists.
   * If the cart exists, return it.
   * Otherwise, throw an error.
   * @param {*} cartId 
   * @returns 
   */
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

  /**
   * Update the cart with the given product.
   * Check if the product exists in the cart.
   * If the product exists, increment its quantity by 1.
   * If the product does not exist, add it to the cart with a quantity of 1.
   * Save the updated cart to the file.
   * If any error occurs during the process, log it and throw an error.
   * 
   * @returns {void}
   * @param {*} cart 
   * @param {*} product 
   */
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
