export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  addProduct = async (product) => {
    return await this.dao.addProduct(product);
  }

  getAllProducts = async () => {
    return await this.dao.getAllProducts();
  }

  getAllProductsLegacy = async () => {
    return await this.dao.getAllLegacy();
  }

  getProductById = async (id) => {
    return await this.dao.getProductById(id);
  }

  updateProduct = async (productId, updatedData) => {
    return await this.dao.updateProduct(productId, updatedData);
  }

  deleteProduct = async (productId) => {
    return await this.dao.deleteProduct(productId);
  }

  updateStock = async (productId, qtty) => {
    return await this.dao.updateStock(productId, qtty);
  }

}