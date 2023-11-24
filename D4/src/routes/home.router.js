import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("home", {
    fileCss: "styles.css",
    fileJs: "scripts.js",
    title: "Home",
    name: undefined,
  });
});

export default router;