export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createCart = async () => {
    return await this.dao.createCart();
  }

  getCartById = async (id) => {
    return await this.dao.getCartById(id);
  }

  addProductToCart = async (anId, productId, qtty) => {
    return await this.dao.addProductToCart(anId, productId, qtty);
  }

  deleteProductFromCart = async (cartId, productId) => {
    return await this.dao.deleteProductFromCart(cartId, productId);
  }

  deleteCart = async (id) => {
    return await this.dao.deleteCart(id);
  }

  updateCart = async (id, cart) => {
    return await this.dao.updateCart(id, cart);
  }

  getAllCarts = async () => {
    return await this.dao.getAllCarts();
  }

  getCartByUserId = async (userId) => {
    return await this.dao.getCartByUserId(userId);
  }

}