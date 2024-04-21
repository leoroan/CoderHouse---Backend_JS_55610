import CartDao from "../dao/mongo/cart.dao.js";
import ProductDAO from "../dao/mongo/product.dao.js";
import UserDAO from "../dao/mongo/user.dao.js";
import TicketDAO from "../dao/mongo/ticket.dao.js";

import CartRepository from "./cart.repository.js";
import ProductRepository from "./product.repository.js";
import UserRepository from "./user.repository.js";
import TicketRepository from "./ticket.repository.js";

const cartDao = new CartDao();
const productDao = new ProductDAO();
const userDao = new UserDAO();
const ticketDao = new TicketDAO();

export const cartService = new CartRepository(cartDao);
export const productService = new ProductRepository(productDao);
export const userService = new UserRepository(userDao);
export const ticketService = new TicketRepository(ticketDao);