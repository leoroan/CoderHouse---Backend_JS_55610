import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("about", {
    fileFavicon: "favicon.ico",
    fileCss: "styles.css",
    fileJs: undefined,
    title: "About me",
    name: undefined,
  });
});

export default router;