import { Router } from "express";
import { getProductByIdMiddleware } from '../../middlewares/productManagerMiddleware.js';
import ProductManager from "../../models/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./models/data/", "productos.json");
const products = productManager.getProducts();

router.get("/", (req, res) => {
  let { limit } = req.query;

  if (limit) {
    limit = parseInt(limit);
    const limitedProducts = products.slice(0, limit);
    res.json({ limitedProducts });
  } else {
    res.json({ products });
  }
});


router.get("/:pid", getProductByIdMiddleware , (req, res) => {
  const { product } = req;
  res.json({ product });
});

//Post a new product
// middleware too
// router.post("/", (req, res) => {
//   const { name, age } = req.body;

//   pets.push({
//     name,
//     age,
//   });

//   res.json({
//     pet: {
//       name,
//       age,
//     },
//   });
// });

//Put a product
// middleware?
// router.put("/:pid", (req, res) => {
//   const { pid } = req.params;
//   const { name, price } = req.body;

//   const productIndex = products.findIndex((product) => product.id === pid);

//   if (productIndex === -1) {
//     return res.status(404).json({
//       message: "Product not found",
//     });
//   }

//   products[productIndex] = {
//     ...products[productIndex],
//     name,
//     price,
//   };

//   res.json({
//     product: products[productIndex],
//   });

// });


export default router;