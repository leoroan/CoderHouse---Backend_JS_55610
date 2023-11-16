import { Router } from "express";

const router = Router();

const products = [];

// Get the products
router.get("/", (req, res) => {
  res.json({
    products,
  });
});

// Get the selected product
// middleware time
// router.get("/:pid", (req, res) => {
//   res.json({
//     products,
//   });
// });

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