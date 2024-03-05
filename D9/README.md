# **DESAFÍO ENTREGABLE** - Implementación de logger


**Consigna**
- Basado en nuestro proyecto principal, implementar un logger

**Aspectos a incluir**
- Primero, definir un sistema de niveles que tenga la siguiente prioridad (de menor a mayor):
debug, http, info, warning, error, fatal
- Después implementar un logger para desarrollo y un logger para producción, el logger de desarrollo deberá loggear a partir del nivel debug, sólo en consola
- Sin embargo, el logger del entorno productivo debería loggear sólo a partir de nivel info.
- Además, el logger deberá enviar en un transporte de archivos a partir del nivel de error en un nombre “errors.log”
- Agregar logs de valor alto en los puntos importantes de tu servidor (errores, advertencias, etc) y modificar los console.log() habituales que tenemos para que muestren todo a partir de winston.
- Crear un endpoint /loggerTest que permita probar todos los logs




# **new readme with new file structure**

- src
  - configs
    - auth
      - github.config.js
      - google.config.js
      - jwt.config.js
    - db
      - db.config.js
      - mongodb-singleton.js
    - server
      - express.config.js
      - http.config.js
      - socket.config.js
  - constants
    - salt.constant.js
  - controllers
    - auth.controller.js
    - cart.controller.js
    - chat.controller.js
    - products.controller.js
  - middlewares
    - hasPermissions.middleware.js
  - models
    - cart.model.js
    - chat.model.js
    - product.model.js
    - ticket.model.js
    - user.model.js
  - public
    - assets
    - css
    - js
  - routes
    - auth.routes.js
    - carts.routes.js
    - messages.routes.js
    - products.routes.js
    - view.routes.js
  - services
    - dao
      - mongo
        - auth.dao.js
        - cart.dao.js
        - chat.dao.js
        - product.dao.js
    - dto
      - cart.dto.js
      - chat.dto.js
      - product.dto.js
      - user.dto.js
    - repository
      - auth.repository.js
      - cart.repository.js
      - chat.repository.js
      - product.repository.js
    - factory.js
  - utils
    - bcrypt.js
    - fetch.js
    - jwt.js
    - mail.js
    - passport.js
    - process.js
  - views
    - layouts
    - adminPanel.handlebars
    - cart.handlebars
    - chat.handlebars
    - login.handlebars
    - productDetail.handlebars
    - products.handlebars
    - profile.handlebars
    - register.handlebars
    - succesfullyBuy.handlebars
    - userProducts.handlebars
- app.js
- utils.js
- .env.example
