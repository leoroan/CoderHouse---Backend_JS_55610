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
    name: "admin",
    admin: true,
    products: products,
  });
});

export default router;