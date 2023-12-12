import express from 'express';
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import homeRouter from "./routes/home.router.js";
import aboutRouter from "./routes/about.router.js";

//D4 imports
import handlebars from "express-handlebars";
import __dirname from "./util.js";
// import http from 'http';
import { Server } from "socket.io";

//express conf.
const PORT = 8080;
const app = express();

//conf. para los sockets
// const server = http.createServer(app);
const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const io = new Server(httpServer);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuramos el engine
app.engine("hbs",
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
app.use("/", homeRouter);

// Routes
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/aboutMe", aboutRouter);

// Leo la lista de productos
import ProductManager from '../models/ProductManager.js';
const pm = new ProductManager("./models/data/", "productos.json");

//sockets
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (data) => {
    console.log(data);
  });

  const products = pm.getProducts();
  socket.emit("product_list", products);

  socket.on("new_product", (data) => {
    pm.addProduct(data);
    
    socket.emit("product_list", products);
  });

});




//now listening from "server"(server = http.createServer(app))
// server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));