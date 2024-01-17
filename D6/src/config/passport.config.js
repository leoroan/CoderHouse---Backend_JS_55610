import passport from 'passport';
import passportLocal from 'passport-local';
import { userModel } from '../model/user.model.js';
import { createHash, isValidPassword } from '../util.js';

//  Declaramos estrategia
const localStrategy = passportLocal.Strategy;
const initializePassport = () => {
  /**
        *  Inicializando la estrategia local, username sera para nosotros email.
        *  "Done" será nuestro callback
  */

  passport.use('register', new localStrategy(
    // passReqToCallback: para convertirlo en un callback de request, para asi poder iteracturar con la data que viene del cliente
    // usernameField: renombramos el username
    // { passReqToCallback: true, usernameField: 'email' },
    { passReqToCallback: true },
    async (req, username, password, done) => {
      const { email, type } = req.body;
      try {
        const exist = await userModel.findOne({ email: email });
        if (exist) {
          done(null, false)
        }
        const user = {
          username,
          email,
          password: createHash(password),
          type
        }
        const result = await userModel.create(user);
        return done(null, result)
      } catch (error) {
        return done("Registration ERROR " + error);
      }
    }
  ))

  //Estrategia de Login:
  passport.use('login', new localStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      try {
        const user = await userModel.findOne({ email: username });
        if (!user) {
          console.warn("User doesn't exists with username: " + username);
          return done(null, false);
        }
        if (!isValidPassword(user, password)) {
          console.warn("Invalid credentials for user: " + username);
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  //Funciones de Serializacion y Desserializacion:
  // estas funciones permiten a Passport.js manejar la información del usuario durante el proceso de autenticación,
  // serializando y deserializando los usuarios para almacenar
  // y recuperar información de la sesión. Estas funciones son esenciales cuando se implementa la autenticación de 
  // usuarios en una aplicación Node.js utilizando Passport.js.

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user)
    } catch (error) {
      console.error("Error deserializando el usuario: " + error);
    }
  })
}

export default initializePassport;