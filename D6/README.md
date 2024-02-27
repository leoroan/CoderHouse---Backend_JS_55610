# DESAFÍO ENTREGABLE - Refactor a nuestro login
## Consigna
- Con base en el login de nuestro entregable anterior, refactorizar para incluir los nuevos conceptos.

## Aspectos a incluir
- Se deberá contar con un hasheo de contraseña utilizando bcrypt
- Se deberá contar con una implementación de passport, tanto para register como para login.
- Implementar el método de autenticación de GitHub a la vista de login.

## Formato de entrega
- Link al repositorio de Github, el cual debe contar con todo el proyecto.
- No incluir node_modules

## Dependencias agregadas al desafio

```javascript
  "dependencies": {
      "bcrypt": "^5.1.1",
      "session-file-store": "^1.5.0",
      "passport": "^0.7.0",
      "passport-local": "^1.0.0",
      "passport-github2": "^0.1.12",
    }
```

- Implementamos "Bcrypt" (en /utils.js)
```javascript
  import bcrypt from 'bcrypt';
  // Generador del hash
  export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // Validamos el hash
  export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
  }   
```
