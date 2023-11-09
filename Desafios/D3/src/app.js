// const express = require("express");
const express = require('express');
const app = express();

app.get("/", (req, res) => {
  res.send("<h1> Hello World! </h1>");
});

// Desafio de clase
app.get("/", (req, res) => {
  res.send("<h1 style='color: blue'>Bienvenido </h1>");
});

app.get("/usuario", (request, res) => {
  res.json({
    nombre: "Emiliano",
    apellido: "Perez",
    edad: 26,
    correo: "emi@gmail.com",
  });
});

app.listen(8080, () => console.log("Server listening on port 8080"));