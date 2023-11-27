import { Router } from "express";
import { getLimitMiddleware } from "../../middlewares/productManagerMiddleware.js";

const router = Router();

router.get("/", (req, res, next) => {
  req.query.limit = 5;
  next();
  
}, getLimitMiddleware, (req, res) => {
  const { products } = req;

  res.render("home", {
    fileFavicon: "favicon.ico",
    fileCss: "styles.css",
    fileJs: "home.scripts.js",
    title: "Home Shop",
    name: undefined,
    products: products,
  });
});

export default router;