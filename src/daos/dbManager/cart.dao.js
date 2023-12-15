import { cartModel } from "../../model/cart.model.js";

class CartDao {
  async createCart() {
    try {
      const cart = await cartModel.create({});
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartModel.findById(id);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async updateCart(id, cart) {
    try {
      const updatedCart = await cartModel.findByIdAndUpdate(id, cart, {
        new: true,
      });
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(id) {
    try {
      const deletedCart = await cartModel.findByIdAndDelete(id);
      return deletedCart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      } cart.products.push({ productId, quantity });
    } catch (error) {
      throw error;
    }
  }
  
}


export default CartDao;

