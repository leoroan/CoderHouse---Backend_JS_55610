## REQS

- **Paso 1:** `npm init -y`
  - Express no es nativo de Node.js, por lo tanto, necesitaremos contar con un `package.json` para gestionar las dependencias a instalar. Una vez que tenemos `package.json` en nuestra carpeta, podemos continuar instalando dependencias.

- **Paso 2:** `npm install express`
  - Procedemos a instalar de manera local Express.js. Al ejecutar este comando, notaremos cómo se genera una carpeta `node_modules`, que es donde se encuentra almacenado Express.js. A partir de este punto, ya contamos con la estructura elemental instalada, el resto es más "flexible".

- **Paso 3:** Estructurar el proyecto
  - Se recomienda tener una carpeta `src`, donde vivirá todo nuestro código, dentro del cual crearemos un archivo con el nombre `app.js`.

  - Finalmente, el archivo `app.js` ya puede importar la dependencia instalada de Express.js, ya sea por CommonJS:
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
