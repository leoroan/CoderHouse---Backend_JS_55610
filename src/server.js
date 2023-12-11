import express from "express";
import { __dirname } from "./dirname.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import { password, PORT, db_name } from "./env.js";
import usersRouter from "./routes/users.routes.js";
import mongoose from "mongoose";

// genéricos
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

// Mongoose connection
mongoose
  .connect(
    `mongodb+srv://leoroan:${password}@cluster0.pu728w1.mongodb.net/${db_name}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Hubo un error");
    console.log(err);
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
