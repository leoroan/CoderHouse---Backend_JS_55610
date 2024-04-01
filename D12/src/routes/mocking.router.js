import { Router } from "express";
import {faker} from "@faker-js/faker";


const router = Router();

router.get('/', (req, res) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    const product = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
      description: faker.lorem.sentence(),
    };
    products.push(product);
  }
  res.json(products);
});

export default router;