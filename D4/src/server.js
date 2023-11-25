import express from 'express';
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import homeRouter from "./routes/home.router.js";

//D4 imports
import handlebars from "express-handlebars";
import __dirname from "./util.js";
import http from 'http';
import { Server } from "socket.io";

//express conf.
const PORT = 8080;
const app = express();

//conf. para los sockets
const server = http.createServer(app);
const io = new Server(server);

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

//sockets
io.on("connection", (socket) => {
  console.log("New client connected");
});

//now listening from "server"(server = http.createServer(app))
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));