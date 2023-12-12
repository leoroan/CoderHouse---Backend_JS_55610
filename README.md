### CoderHouse---Backend_JS_55610
Repo con los tps y trabajo final del curso de Back-End de "Coder House" 2023

# Práctica de integración sobre tu ecommerce

## Consigna

Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos:

## Aspectos a incluir

- Agregar el modelo de persistencia de Mongo y mongoose a tu proyecto.
- Crear una base de datos llamada “ecommerce” dentro de tu Atlas, crear sus colecciones “carts”, “messages”, “products” y sus respectivos schemas.
- Separar los Managers de fileSystem de los managers de MongoDb en una sola carpeta “dao”. Dentro de dao, agregar también una carpeta “models” donde vivirán los esquemas de MongoDB. La estructura deberá ser igual a la vista en esta clase.
- Contener todos los Managers (FileSystem y DB) en una carpeta llamada “Dao”.
- Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem.
- NO ELIMINAR FileSystem de tu proyecto.
- Implementar una vista nueva en handlebars llamada chat.handlebars, la cual permita implementar un chat como el visto en clase. Los mensajes deberán guardarse en una colección “messages” en mongo (no es necesario implementarlo en FileSystem). El formato es:  {user:correoDelUsuario, message: mensaje del usuario}.
- Corroborar la integridad del proyecto para que todo funcione como lo ha hecho hasta ahora.

## Sugerencias

- Te recomendamos que, para este entregable, repitas las pruebas realizadas en la pre-entrega de la clase 8.n

## Formato de entrega

Link al repositorio de Github, el cual debe contar con todo el proyecto.
No incluir node_modules


## REQS

### **VIP EDIT:**

- **Paso 1:** `npm i`
  - Paso inicial para instalar las dependencias asociadas al proyecto.

```javascript
"dependencies": {
    "express": "^4.18.2",
    "express-handlebars": "^7.1.2",
    "mongoose": "^8.0.3",
    "socket.io": "^4.7.2",
    "uuidv4": "^6.2.13"
  }
```

