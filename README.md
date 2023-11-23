### CoderHouse---Backend_JS_55610
Repo con los tps y trabajo final del curso de Back-End de "Coder House" 2023

# **Primera Pre entrega**

**Se debe entregar**
- Desarrollar el servidor basado en **Node.JS** y **express**, que escuche en el puerto **8080** y disponga de dos grupos de rutas: **/products** y **/carts**. Dichos endpoints estarán implementados con el router de **express**, con las siguientes especificaciones: 
 
- Para el manejo de productos, el cual tendrá su router en **/api/products/**, configurar las siguientes rutas:
  - La ruta raíz **GET /** deberá listar todos los productos de la base. (Incluyendo la limitación **limit** del desafío anterior)
  - La ruta **GET /:pid** deberá traer sólo el producto con el id proporcionado.

- La ruta raíz **POST /** deberá agregar un nuevo producto con los campos:
  - **id**: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo).
  - **title**: String,
  - **description**: String
  - **code**: String
  - **price**: Number
  - **status**: Boolean (Status es true por defecto.)
  - **stock**: Number
  - **category**: String
  - **thumbnails**: [] (Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto)

  Todos los campos son obligatorios, a excepción de **thumbnails**

- La ruta **PUT /:pid** deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el **id** al momento de hacer dicha actualización.
- La ruta **DELETE /:pid** deberá eliminar el producto con el **pid** indicado. 
- Para el carrito, el cual tendrá su router en **/api/carts/**, configurar dos rutas:
  - La ruta raíz **POST /** deberá crear un nuevo carrito con la siguiente estructura:
    - **Id**: Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
    - **products**: Array que contendrá objetos que representen cada producto.
  - La ruta **GET /:cid** deberá listar los productos que pertenezcan al carrito con el parámetro **cid** proporcionados.
  - La ruta **POST  /:cid/product/:pid** deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
    - **product**: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
    - **quantity**: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
    - Además, si un producto ya existente intenta agregarse al producto, incrementar el campo **quantity** de dicho producto.

- La persistencia de la información se implementará utilizando el file system, donde los archivos **“productos.json”** y **“carrito.json”**, respaldan la información.
No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por **Postman** o por el cliente de tu preferencia.

## REQS

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

## TESTs

- **Paso 1:** Instalar Mocha y Chai como dependencias de desarrollo:
  - `npm install --save-dev mocha chai`

  - Crear un archivo de prueba de Mocha (por ejemplo, test.js) utilizando afirmaciones de Chai
    ```javascript
    import chai from 'chai';
    const { assert } = chai;
    ```

- **Paso 2:** Ejecutar las pruebas utilizando el comando de Mocha:
  - `npx mocha` // El flag --require esm se utiliza para habilitar el soporte de módulos ECMAScript (ESM) en Mocha.
