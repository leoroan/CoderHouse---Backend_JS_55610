import express from "express";
import { __dirname } from "./dirname.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import { password, PORT, db_name } from "./env.js";
import usersRouter from "./routes/users.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
