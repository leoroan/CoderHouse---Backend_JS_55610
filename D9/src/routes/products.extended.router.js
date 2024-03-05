import CustomRouter from "./custom/custom.router.js";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController
} from "../controllers/products.controller.js";

export default class ProductExtendRouter extends CustomRouter {
  init() {

    // Obtener un producto por ID
    this.get('/:id', ["PUBLIC"], async (req, res) => {
      getProductByIdController(req, res)
    });

    // Get all products
    this.get('/', ["PUBLIC"], async (req, res) => {
      getAllProductsController(req, res)
    });

    // Crear un nuevo producto
    this.post('/', ["ADMIN"], async (req, res) => {
      createProductController(req, res)
    });


    // Actualizar un producto por ID
    this.put('/:id', ["ADMIN"], async (req, res) => {
      updateProductController(req, res)
    });

    // Eliminar un producto por ID
    this.delete('/:id', ["ADMIN"], async (req, res) => {
      deleteProductController(req, res)
    });

  }
}