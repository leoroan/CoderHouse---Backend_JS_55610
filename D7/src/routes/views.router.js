import { Router } from "express";
import ProductDAO from "../daos/dbManager/product.dao.js";
import passport from "passport";
import { authToken, authorization } from '../util.js';

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
    user: req.session.user || req.user,
    admin: req.session.user && req.session.user.type === "admin"
  });
});

router.get("/profile", 
  // authToken,
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
  res.render('profile', {
    fileFavicon: "favicon.ico",
    fileCss: "styles.css",
    fileJs: "main.scripts.js",
    title: "user profile",
    user: req.user // Trtabajando con JWT
  })
})


export default router;