import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Desafio: Documentar la API',
      version: '1.0.0',
      description: 'Documentacion de las APIs implementadas en el proyecto',
    },
    tags: [
      {
        "name": "Productos",
        "description": "Productos de la tienda"
      },
      {
        "name": "carts",
      }
    ],
    
  },
  apis: [`./src/docs/**/*.yaml`] // Ruta a los archivos que contienen tus rutas
    
};
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;