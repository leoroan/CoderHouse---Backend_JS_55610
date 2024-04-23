# PROGRAMACION BACK END CON NODE.JS
## @CoderHouse Backend JS #55610
*Repo con los tps y trabajo final del curso de Back-End de "Coder House" 2023*

---

## PROYECTO ENTREGA FINAL
En esta última entrega del proyecto, estoy emocionado de demostrar el conocimiento adquirido y aplicar las habilidades que desarrollé y perfeccioné,
este proyecto tipo "e-commerce" fue concebido para implementar un "back end" en Node.js con un conjunto completo de operaciones CRUD.

En este repositorio, abordé diversos desafíos relacionados con la gestión de productos y usuarios, implementando diferentes roles y funcionalidades de carrito de compras. Puedes ver cómo como usuario puedes crear y vender tus propios productos en la tienda. Es importante destacar que no puedes comprar tus propios productos ni administrar (editar o eliminar) los productos de otros usuarios, a menos que tengas el rol de usuario premium. Para obtener este rol, se requiere cargar cierta documentación en tu perfil, aún asi los productos administrables serás los propios. Solo un administrador va a tener un control "general" sobre la aplicacion.

En cuanto a la gestión del carrito de compras, podes agregar productos que se acumulen y gestionar el stock una vez realizada la compra. Si un producto se agota mientras está en tu carrito, el sistema te permitirá comprar solo los productos que estén en stock al momento de realizar la compra. Una vez completada la compra, recibirás un correo electrónico de confirmación en tu bandeja de entrada con los detalles de la transacción.

Como visitante, tendrás la capacidad de registrarte utilizando una dirección de correo electrónico, así como restablecer o cambiar tu contraseña mediante una validación contra tu correo electrónico registrado.

como usuario, vas a poder realizar la compra de los productos exibidos.

como usuario premium, vas a poder crear productos, editarlos y borrarlos.

Como usuario administrador vas a poder crear, modificar y eliminar productos sin importar de quien sean, salvo que a los usuarios premium se les va a avisar cuando su producto sea eliminado.
además, vas a poder cambiar el rol de los usuarios sin validaciones previas, como así eliminarlos "con solo un click". Tambien contas con la capacidad de eliminar a los usuarios que se encuentren inactivos pasados cierta cantidad de días.

---

### Características del Proyecto
1. **Generación de Datos Aleatorios:** Utiliza `@faker-js/faker` para generar datos ficticios de forma realista para pruebas y desarrollo.
   
2. **Seguridad de Contraseñas:** Implementa el cifrado de contraseñas mediante `bcrypt` para garantizar la seguridad de las credenciales de los usuarios.
   
3. **Interfaz de Línea de Comandos:** Integra `commander` para facilitar la creación de interfaces de línea de comandos para administrar el proyecto.
   
4. **Almacenamiento de Sesiones:** Utiliza `connect-mongo` para almacenar sesiones de usuario en MongoDB de forma eficiente.
   
5. **Gestión de Cookies:** Implementa `cookie-parser` para analizar y gestionar cookies en las solicitudes HTTP.
   
6. **Configuración de Entorno:** Utiliza `dotenv` para cargar variables de entorno desde un archivo `.env` para una configuración flexible del entorno de desarrollo.
   
7. **Framework Web:** Utiliza `express` como framework web para crear aplicaciones web y API RESTful de manera sencilla y eficiente.
   
8. **Plantillas de Handlebars:** Integra `express-handlebars` para renderizar vistas HTML utilizando el motor de plantillas Handlebars en Express.
   
9. **Gestión de Sesiones:** Utiliza `express-session` para gestionar sesiones de usuario en aplicaciones web.
   
10. **Autenticación con Tokens JWT:** Implementa la autenticación basada en tokens JWT (JSON Web Tokens) con `jsonwebtoken` para proteger rutas y recursos de la aplicación.
   
11. **Interacción con MongoDB:** Utiliza `mongoose` como biblioteca de modelado de objetos MongoDB para trabajar con bases de datos MongoDB de forma sencilla y eficiente.
   
12. **Paginación de Resultados:** Implementa la paginación de resultados en consultas MongoDB con `mongoose-paginate-v2`.
   
13. **Procesamiento de Archivos:** Utiliza `multer` para el manejo de archivos multipart/form-data en formularios HTML.
   
14. **Envío de Correos Electrónicos:** Integra `nodemailer` para enviar correos electrónicos de forma programática desde la aplicación.
   
15. **Autenticación con Passport.js:** Utiliza `passport` junto con diferentes estrategias como `passport-local` y `passport-jwt` para la autenticación de usuarios en la aplicación.
   
16. **Integración con GitHub OAuth:** Implementa la autenticación OAuth con GitHub utilizando `passport-github2` para permitir que los usuarios inicien sesión con sus cuentas de GitHub.
   
17. **Integración de WebSockets:** Utiliza `socket.io` para habilitar la comunicación bidireccional en tiempo real entre el cliente y el servidor.
   
18. **Documentación de API con Swagger:** Utiliza `swagger-jsdoc` y `swagger-ui-express` para generar documentación interactiva de la API.
   
19. **Generación de UUIDs:** Utiliza `uuidv4` para generar identificadores únicos universalmente.
   
20. **Registro de Actividades:** Utiliza `winston` para registrar eventos y actividades en la aplicación.

### Dependencias de Desarrollo
1. **Pruebas con Chai:** Utiliza `chai` para escribir y ejecutar pruebas unitarias y de integración en la aplicación.
   
2. **Framework de Pruebas Mocha:** Utiliza `mocha` como framework de pruebas para ejecutar pruebas de forma sencilla y flexible.
   
3. **Pruebas de Integración con Supertest:** Utiliza `supertest` para realizar pruebas de integración de API HTTP.
---

### CÓMO CORRER EL PROYECTO

* **Prueba la Aplicación en Railway:** Actualmente puedes probar la aplicación en *Railway* ([enlace a la App](https://coderhouse-backendjs55610-production.up.railway.app/)) (Abril/24).

* **Ejecución en tu Propio Entorno:**
    - Forkea, copia o descarga el repositorio.
    - Una vez que tengas el proyecto "listo":
        - Vas a necesitar un archivo `.env.development` (si deseas un entorno de desarrollo) o `.env.production` (para pasar a producción).
            - **AMBOS ARCHIVOS REQUIEREN LAS MISMAS VARIABLES DE ENTORNO, PERO SE CONFIGURAN DE MANERA DIFERENTE:**
                - `PORT={}`
                - `MONGO_URL={}`                
    - Ejecutá los siguientes comandos en tu terminal:
        - `npm run dev` (para desarrollo)
        - `npm run start` (para producción)
---

### Créditos

Este proyecto fue desarrollado por Leandro Maselli como alumno de Coder House, comision 55610.
del 18 octubre 2023 al 17 de Abril de 2024.

#### Contribuciones

- Amadeo Isella Cacciagiu [TUTOR](https://github.com/amadeoisella)
- Alejandro Huertas       [PROFESOR](https://github.com/AleHts29)

---

## Índice de desafios y demás tareas provistas para el proyecto final
1. [Desafíos](https://github.com/leoroan/CoderHouse---Backend_JS_55610/tree/desafios)   
2. [Primera Pre-Entrega](https://github.com/leoroan/CoderHouse---Backend_JS_55610/tree/PriemeraPreEntrega)   
3. [Segunda Pre-Entrega](https://github.com/leoroan/CoderHouse---Backend_JS_55610/tree/SegundaPreEntrega)
4. [Tercera Pre-Entrega](https://github.com/leoroan/CoderHouse---Backend_JS_55610/tree/TerceraPreEntrega)   
5. [Primera Practica Integradora](https://github.com/leoroan/CoderHouse---Backend_JS_55610/tree/PrimeraPracticaIntegradora)
6. [Segunda Practica Integradora](https://github.com/leoroan/CoderHouse---Backend_JS_55610/tree/SegundaPracticaIntegradora)