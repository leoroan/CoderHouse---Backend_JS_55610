import express from 'express';

const PORT = 8080;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta main
app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido",
  });
});

// Routes
// app.use("/api/some_route", my_route


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));