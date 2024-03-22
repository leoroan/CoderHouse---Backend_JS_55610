import express from 'express';
import UserExtendRouter from './routes/users.extend.router.js';
import ProductsExtendRouter from './routes/products.extended.router.js';
import CartExtendRouter from './routes/carts.extended.router.js';
import viewsRouter from "./routes/views.router.js";
import mailRouter from "./routes/mailer.router.js";
import mockingRouter from "./routes/mocking.router.js";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import config from './configs/config.js';
import { addLogger } from './middlewares/logger.middleware.js';
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import passport from 'passport';
import initializePassport from './configs/auth/passport.config.js'
import MongoSingleton from './configs/mongoDB-singleton.js';
import swaggerSpecs from './configs/swagger.config.js';
import swaggerUi from "swagger-ui-express";

const SERVER_PORT = config.port;

//express conf.
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// **Logger
app.use(addLogger);

// **BASE
app.get("/logger", (req, res) => {
  req.logger.debug("Prueba de log level warn --> en developer mode");
  req.logger.info("Prueba de log level info --> en production mode");
  res.send("Prueba de logger!");
});

// const server = http.createServer(app);
app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`));

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
    // Usando --> connect-mongo
    store: MongoStore.create({
      mongoUrl: config.urlMongo,
      //mongoOptions --> opciones de confi para el save de las sessions
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 10 * 60
    }),

    secret: "s3cr37",
    resave: false, // guarda en memoria
    saveUninitialized: true //lo guarda a penas se crea
  }
))

//Cookies
//router.use(cookieParser());
app.use(cookieParser("CoderS3cr3tC0d3"));

// Middleware de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Ruta main
app.use("/", viewsRouter);

// Routes
const userExtRouter = new UserExtendRouter();
const productsExtRouter = new ProductsExtendRouter();
const cartsExtRouter = new CartExtendRouter();

app.use("/api/users", userExtRouter.getRouter());
app.use("/api/products", productsExtRouter.getRouter());
app.use("/api/carts", cartsExtRouter.getRouter());
app.use("/mailer", mailRouter);
app.use("/mockingrouter", mockingRouter);

console.log(swaggerSpecs);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    console.error(error);
    process.exit();
  }
};
mongoInstance();
