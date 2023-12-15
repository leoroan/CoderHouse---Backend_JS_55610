import { Router } from "express";
import UserDao from "../daos/dbManager/user.dao.js";

const router = Router();
const userDao = new UserDao();



export default router;