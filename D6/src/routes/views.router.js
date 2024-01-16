import { Router } from "express";
import ProductDAO from "../daos/dbManager/product.dao.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const { limit, page, sort, category } = req.query;
  const productDao = new ProductDAO();
  const products = await productDao.getAllProducts({ limit, page, sort, category });

  res.render("index", {
    fileFavicon: "favicon.ico",
    fileCss: "styles.css",
    fileJs: "main.scripts.js",
    title: "Home Shop",
    products: products,
    user: req.session.user,
    admin: req.session.user && req.session.user.type === "admin"
  });
});

export default router;