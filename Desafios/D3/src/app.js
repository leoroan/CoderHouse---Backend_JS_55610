const express = require('express');
const app = express();
const PORT = 8080;
const productos = require('./Productos.json');
const maxLimit = productos.length;

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send(`
    <h1>Saludos, desde el 3er desafío!</h1>
    <a href="/productos"><button>Ver Productos</button></a>
  `);
});

app.get("/usuario", async (req, res) => {
  res.json({
    nombre: "Cosme",
    apellido: "Fulanito",
    edad: 62,
    correo: "cFulano@gmail.com",
  });
});

app.get("/productos", async (req, res) => {
  let { limit } = req.query;
  const btn = `<a href="/"><button>go Back!</button></a>`;

  const htmlForm = `
    <h1>Products</h1>
    <form method="get">
      <label for="limit">Amount of products to show:</label>
      <input type="number" name="limit" id="limit" min="1" max="${maxLimit}" value="${limit || 1}">
      <button type="submit">Update</button>
    </form>
  `;

  if (limit) {
    limit = parseInt(limit);
    const limitedProducts = productos.slice(0, limit);
    const productList = limitedProducts.map(product => `<li>${product.title} -ID: ${product.id}</li>`).join('');
    res.send(`${htmlForm}<ul>${productList}</ul><br>${btn}`);
  } else {
    const productList = productos.map(product => `<li>${product.title} -ID:  ${product.id}</li>`).join('');
    res.send(`${htmlForm}<ul>${productList}</ul><br>${btn}`);
  }
});

app.get("/productos/:pid", (req, res) => {
  const btn = `<a href="/products"><button>go Back to products!</button></a>`;
  let producto = req.params.pid;
  let productoEncontrado = productos.find(product => product.id == producto);
  if (productoEncontrado) {
    res.send(`<h1>Producto: </h1> 
        Title: ` + productoEncontrado.title + `<br>
        Price: ` + productoEncontrado.price + `<br>
        Description:` + productoEncontrado.description + ` <br><br> ${btn}`);
  } else {
    res.send(`<h1>Producto no encontrado: </h1><br>${btn}`);
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
