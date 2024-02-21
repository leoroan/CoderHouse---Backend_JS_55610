import CustomRouter from "./custom/custom.router.js";
import {
  getAllCartsController,
  getCartByIdController,
  getCartByUserIdController,
  createCartController,
  deleteWholeCartController,
  deleteProductFromCartByIdController,
  addProductToCartByIdController,
} from "../controllers/carts.controller.js";

export default class CartExtendRouter extends CustomRouter {
  init() {

    // Get all carts
    this.get('/', ["ADMIN"], async (req, res) => {
      getAllCartsController(req, res)
    });

    // Get a cart by ID
    this.get('/:id', ["USER", "ADMIN"], async (req, res) => {
      getCartByIdController(req, res)
    });

    // Get a cart by user ID
    this.get('/user/:uid', ["USER", "ADMIN"], async (req, res) => {
      getCartByUserIdController(req, res)
    });

    // Agregar un producto al carrito por ID
    this.put('/:cid/product/:pid/:qtty', ["USER", "ADMIN"], async (req, res) => {
      addProductToCartByIdController(req, res)
    });

    // Eiminar un producto del carrito por ID
    this.delete('/:cid/product/:pid', ["USER", "ADMIN"], async (req, res) => {
      deleteProductFromCartByIdController(req, res)
    });

    // Eiminar todo el carrito
    this.delete('/:cid/', ["USER", "ADMIN"], async (req, res) => {
      deleteWholeCartController(req, res)
    });

    // Crear un nuevo carrito
    this.post('/:uid', ["USER", "ADMIN"], async (req, res) => {
      createCartController(req, res)
    });
  }
}