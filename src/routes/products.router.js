import { Router } from "express";
import { getProductByIdMiddleware } from '../../middlewares/productManagerMiddleware.js';
import { getLimitMiddleware } from '../../middlewares/productManagerMiddleware.js';

const router = Router();

//Get all products
router.get("/", getLimitMiddleware, (req, res) => {
  const { products } = req;
  res.json({ products });
});

//Get a product by id
router.get("/:pid", getProductByIdMiddleware, (req, res) => {
  const { product } = req;
  res.json({ product });
});

//Post a product
router.post("/", (req, res) => {
  const { name, age } = req.body;

  pets.push({
    name,
    age,
  });

  res.json({
    pet: {
      name,
      age,
    },
  });
});

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