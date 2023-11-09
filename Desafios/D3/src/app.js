const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}))

const productos = require('../../D2/Productos.json');


app.get("/", (req, res) => {
  res.send("<h1> Hello World! </h1>");
});

app.get("/", (req, res) => {
  res.send("<h1 style='color: blue'>Bienvenido </h1>");
});

app.get("/usuario", (req, res) => {
  res.json({
    nombre: "Cosme",
    apellido: "Fulanito",
    edad: 62,
    correo: "cFulano@gmail.com",
  });
});

app.get("/productos", (req, res) => {
  res.send(productos);
});



app.listen(8080, () => console.log("Server listening on port 8080"));