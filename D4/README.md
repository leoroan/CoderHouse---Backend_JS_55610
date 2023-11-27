### CoderHouse---Backend_JS_55610
Repo con los tps y trabajo final del curso de Back-End de "Coder House" 2023

# DESAFÍO ENTREGABLE - Websockets

## Consigna

Configurar nuestro proyecto para que trabaje con Handlebars y websocket.

## Aspectos a incluir

- Configurar el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de socket.io al mismo.
- Crear una vista “home.handlebars” la cual contenga una lista de todos los productos agregados hasta el momento
- Crear una vista “realTimeProducts.handlebars”, la cual vivirá en el endpoint “/realtimeproducts” en nuestro views router, ésta contendrá la misma lista de productos, sin embargo, ésta trabajará con websockets.
- Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista.

## Sugerencias

- Ya que la conexión entre una consulta HTTP y websocket no está contemplada dentro de la clase. Se recomienda que, para la creación y eliminación de un producto, Se cree un formulario simple en la vista  realTimeProducts.handlebars. Para que el contenido se envíe desde websockets y no HTTP. Sin embargo, esta no es la mejor solución, leer el siguiente punto.
- Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST. ¿Cómo utilizarás un emit dentro del POST?

## Formato de entrega

Link al repositorio de Github, el cual debe contar con todo el proyecto.
No incluir node_modules

# DESAFÍO ENTREGABLE - PROCESO DE TESTING

## Websockets

- Se instalará y correrá el servidor en el puerto indicado.
- El servidor debe levantarse sin problema.
- Se abrirá la ruta raíz
- Debe visualizarse el contenido de la vista index.handlebars
- No se debe activar el websocket aún.
- Se buscará en la url del navegador la ruta “/realtimeproducts”.
- Se corroborará que el servidor haya conectado con el cliente, en la consola del servidor deberá mostrarse un mensaje de “cliente conectado”.
- Se debe mostrar la lista de productos y se corroborará que se esté enviando desde websocket.



## REQS

### **VIP EDIT:**
```diff
- **PRE-STEP:** 
  - He creado en "package.json" el script >> `npm run setup` que instalará todas las dependencias (a continuacion) de una sola vez...
```

- **Paso 1:** `npm init -y`
  - Express no es nativo de Node.js, por lo tanto, necesitaremos contar con un `package.json` para gestionar las dependencias a instalar. Una vez que tenemos `package.json` en nuestra carpeta, podemos continuar instalando dependencias.

- **Paso 2:** `npm install express`
  - Procedemos a instalar de manera local Express.js. Al ejecutar este comando, notaremos cómo se genera una carpeta `node_modules`, que es donde se encuentra almacenado Express.js. A partir de este punto, ya contamos con la estructura elemental instalada, el resto es más "flexible".

- **Paso 3:** Estructurar el proyecto
  - Se recomienda tener una carpeta `src`, donde vivirá todo nuestro código, dentro del cual crearemos un archivo con el nombre `server.js`.

  - Finalmente, el archivo `server.js` ya puede importar la dependencia instalada de Express.js, ya sea por CommonJS:
    ```javascript
    const express = require('express');
    ```
    o bien por módulos (recordar colocar el `type: "module"` en `package.json`):
    ```javascript
    import express from 'express';
    ```
- **Paso 4:** `npm install -g nodemon`
  - Nodemon nos permitirá reiniciar automáticamente el servidor en cuanto detecta que hay cambios en el código. 
    De esta manera, podemos concentrarnos en el código, sin tener que realizar el reinicio manual cada vez que queremos ver algo. 
  - Recordar agregar la anotacion en el archivo package.json:
    ```javascript
    "scripts": {
      "dev": "nodemon src/server.js"
    }
    ```

- **Paso 5:** `npm i uuidv4`
  - Hacemos uso de la libreria "uuid" importandola de la siguiente manera:
    ```javascript
    import { uuid } from 'uuidv4';
    ```

- **Paso 6:** `npm install express express-handlebars`
    ```javascript
    import handlebars from "express-handlebars";
    ```
    ```javascript

    // Configuracion del engine en "server.js"
    app.engine(
      "hbs",
      handlebars.engine({
        // index.hbs
        extname: "hbs",
        // Plantilla principal
        defaultLayout: "main",
      })
    );
    
    // Seteo del motor
    app.set("view engine", "hbs");
    app.set("views", `${__dirname}/views`);
    ```
    **COMENTADO**
    ```javascript
    app.engine("hbs", handlebars.engine({ ... })):
    ```
    - Aquí, se está configurando el motor de plantillas Handlebars con Express. El argumento "hbs" se refiere al nombre del motor, y handlebars.engine({ ... }) parece ser una configuración específica para el motor Handlebars. Algunas de las configuraciones que se están pasando incluyen el tipo de extensión (extname: "hbs") y la plantilla predeterminada (defaultLayout: "main").

    ```javascript
    app.set("view engine", "hbs"):
    ```
    - Esta línea establece el motor de vista de Express como Handlebars. Esto significa que cuando renderices vistas en Express, el sistema utilizará Handlebars como motor para procesar las plantillas.

    ```javascript
    app.set("views", ${__dirname}/views):
    ```
    - Aquí se establece el directorio de vistas para la aplicación. En este caso, se está utilizando el directorio views que está ubicado en el mismo directorio que este código (__dirname). Esto es donde la aplicación buscará las plantillas de Handlebars para renderizar.

- **Paso 7:** `npm install socket.io`
  - Para trabajar con websockets, tanto para cliente como para servidor.
  ```javascript
    import { Server } from "socket.io";
    ```
    ```javascript
    //sockets test connection server-side
    io.on("connection", (socket) => {
    console.log("New client connected");
    }); 

    // socket client-side
    const socket = io();
    ```

   


## TESTs

- **Paso 1:** Instalar Mocha y Chai como dependencias de desarrollo:
  - `npm install --save-dev mocha chai`

  - Crear un archivo de prueba de Mocha (por ejemplo, test.js) utilizando afirmaciones de Chai
    ```javascript
    import chai from 'chai';
    const { assert } = chai;
    ```

- **Paso 2:** Ejecutar las pruebas utilizando el comando de Mocha:
  - `npx mocha`
