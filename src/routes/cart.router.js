import { Router } from "express";
import CartDao from "../daos/dbManager/cart.dao.js"

const router = Router();
const cartDao = new CartDao();

export default router;
