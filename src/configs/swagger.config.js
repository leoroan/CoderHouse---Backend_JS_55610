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
        "name": "Carritos",
        "description": "Carritos de compras de la tienda"
      }
    ],
    
  },
  apis: [`./src/docs/**/*.yaml`] 
    
};
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;