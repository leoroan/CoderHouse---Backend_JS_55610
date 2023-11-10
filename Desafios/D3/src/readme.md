```javascript
//COMENTED README WITH USEFULL ANOTATIONS LIKE A CHEAT-SHEAT

// Import the 'express' module and create an Express application
const express = require('express');
const app = express();

// Define the port number on which the server will run
const PORT = 8080;

// Load product data from a JSON file /(the mocked data)
const productos = require('./Productos.json');

// Determine the maximum number of products available
const maxLimit = productos.length;

// Use middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Home route that displays a greeting and a link to view products
app.get("/", (req, res) => {
  res.send(`
    <h1>Greetings from the 3rd challenge!</h1>
    <a href="/productos"><button>View Products</button></a>
  `);
});

// Route that displays user information in JSON format
app.get("/usuario", (req, res) => {
  res.json({
    name: "Cosme",
    lastname: "Fulanito",
    age: 62,
    email: "cFulano@gmail.com",
  });
});

// Products route with a form to select the number of products to display
app.get("/productos", (req, res) => {
  let { limit } = req.query;
  const btn = `<a href="/"><button>Go Back!</button></a>`;

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

// Start the server on the specified port
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

## BONUS
The main difference between `req.params` and `req.query` is that with `req.query`, you can include as many queries as you wish, as they are not embedded in the route but are separate elements. So, if you don't know the number of things to be queried in your route, it's best to use queries. On the other hand, if you only need a specific and limited number of parameters, you should opt for params.

In the end, there is no one better than the other; they serve different purposes, and you can even use both in the same request.
