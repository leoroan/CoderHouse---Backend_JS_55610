import express from 'express';
import { PASSWORD, PORT, DB_NAME } from "./env.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import userRouter from "./routes/user.router.js";
import viewsRouter from "./routes/views.router.js";
import mongoose from "mongoose";

//D4 imports
import handlebars from "express-handlebars";
import __dirname from "./util.js";

// import http from 'http';
import { Server } from "socket.io";

//express conf.
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const server = http.createServer(app);
const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const io = new Server(httpServer);

// Configuramos el engine
app.engine("hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })
);

// Seteamos nuestro motor de handlebar
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

// Public - carpeta con estáticos
app.use(express.static(`${__dirname}/public`));

// Ruta main
app.use("/", viewsRouter);

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);

//sockets
// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("message", (data) => {
//     console.log(data);
//   });
// });

// Mongoose connection
mongoose
  .connect(
    // `mongodb+srv://test:${PASSWORD}@cluster0.pu728w1.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    `mongodb+srv://test:test@cluster0.pu728w1.mongodb.net/ecommerce?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("There were an error trying to connect db...");
    console.log(err);
  });
