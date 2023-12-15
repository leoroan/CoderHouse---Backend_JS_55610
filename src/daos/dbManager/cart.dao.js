import { cartModel } from "../../model/cart.model.js";
import ProductDAO from "./product.dao.js";

class CartDao {
  async createCart(id) {
    try {
      const existingCart = await cartModel.findOne({ userId: id });
      if (existingCart) {
        return existingCart;
      }
      const newCart = await cartModel.create({ userId: id });
      return newCart;
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
      } 
      cart.products.push({ productId, quantity });
      const pDao = new ProductDAO();
      const product = await pDao.getProductById(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      const price = product.price;
      const total = price * quantity;
      cart.total += total;
      cart.totalProducts += quantity;
      cart.updatedAt = new Date();
      await cart.save();

    } catch (error) {
      throw error;
    }
  }

}


export default CartDao;

