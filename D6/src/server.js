import express from 'express';
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";
import mongoose from "mongoose";
import session from 'express-session';
import MongoStore from 'connect-mongo';

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
app.listen(8080, () => console.log(`Server listening on port ${8080}`));

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

// Configuracion de Session
app.use(session(
  {
      //ttl: Time to live in seconds,
      //retries: Reintentos para que el servidor lea el archivo del storage.
      //path: Ruta a donde se buscará el archivo del session store.
      // // Usando --> session-file-store
      // store: new fileStore({ path: "./sessions", ttl: 15, retries: 0 }),

      // Usando --> connect-mongo
      store: MongoStore.create({
          mongoUrl: `mongodb+srv://test:test@cluster0.pu728w1.mongodb.net/ecommerce?retryWrites=true&w=majority`,
          //mongoOptions --> opciones de confi para el save de las sessions
          mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
          ttl: 10 * 60
      }),

      secret: "s3cr37",
      resave: false, // guarda en memoria
      saveUninitialized: true //lo guarda a penas se crea
  }
))

// Ruta main
app.use("/", viewsRouter);

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);

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
