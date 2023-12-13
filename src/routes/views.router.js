import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    fileFavicon: "favicon.ico",
    fileCss: "styles.css",
    fileJs: "main.scripts.js",
    title: "Home Shop",
  });
});

export default router;