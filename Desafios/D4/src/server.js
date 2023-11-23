import express from 'express';
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

const PORT = 8080;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta main
app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido",
  });
});

// Routes
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));