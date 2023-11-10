const express = require('express');
const app = express();
const PORT = 8080;
const productos = require('./Productos.json');
const maxLimit = productos.length;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <h1>Saludos, desde el 3er desafío!</h1>
    <a href="/productos"><button>Ver Productos</button></a>
  `);
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
  let { limit } = req.query;
  const btn = `<a href="/"><button>go Back!</button></a>`;

  const htmlForm = `
    <form method="get">
      <label for="limit">Amount of products to show:</label>
      <input type="number" name="limit" id="limit" min="1" max="${maxLimit}" value="${limit || 1}">
      <button type="submit">Update</button>
    </form>
  `;

  if (limit) {
    limit = parseInt(limit);
    const limitedProducts = productos.slice(0, limit);
    const productList = limitedProducts.map(product => `<li>${product.title} - ${product.description}</li>`).join('');
    res.send(`${htmlForm}<br><ul>${productList}</ul>${btn}`);
  } else {
    const productList = productos.map(product => `<li>${product.title}</li>`).join('');
    res.send(`${htmlForm}<br><ul>${productList}</ul>${btn}`);
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
