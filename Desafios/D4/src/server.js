import express from 'express';
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

//D4 imports
import handlebars from "express-handlebars";
import __dirname from "./util.js";


const PORT = 8080;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuramos el engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);

// Seteamos nuestro motor
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

// Public
app.use(express.static(`${__dirname}/public`));

// Ruta main
app.get("/", (req, res) => {
  res.status(200);
});

// Routes
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));