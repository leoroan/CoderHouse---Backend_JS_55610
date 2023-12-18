import { cartModel } from "../../model/cart.model.js";
import ProductDAO from "./product.dao.js";

const pDao = new ProductDAO();
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

  async getAllCarts() {
    try {
      return await cartModel.find();
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
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const product = await pDao.getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const { price } = product;
    const total = price * quantity;

    const existingProductIndex = cart.products.findIndex(item => item.productId.equals(productId));

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += Number(quantity);
    } else {
      cart.products.push({ productId, quantity });
    }

    cart.total += Number(total);
    cart.totalProducts += Number(quantity);
    cart.updatedAt = new Date();

    return cart.save();
  }


  async deleteProductFromCart(cartId, productId) {
    try {
      const productInCart = await cartModel.findOne(
        {
          _id: cartId,
          'products.productId': productId
        },
        {
          'products.$': 1, // get only the matched subdocument
        });

      if (productInCart) {
        const result = await cartModel.updateOne(
          { _id: cartId },
          { $pull: { products: { productId: productId } } }
        );

        const product = await pDao.getProductById(productId);
        const price = product.price;
        const quantity = productInCart.products[0].quantity;
        const cart = await cartModel.findById(cartId);

        if (result.acknowledged) {
          cart.total -= Number(quantity * price);
          cart.totalProducts -= Number(quantity);
          cart.updatedAt = new Date();

          console.log('Product removed from cart successfully');
          return await cart.save();
        } else {
          console.error('Product not found in the cart');
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}


export default CartDao;

