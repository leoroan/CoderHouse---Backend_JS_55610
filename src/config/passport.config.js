import passport from 'passport';
import passportLocal from 'passport-local';
import { userModel } from '../model/user.model.js';
import { createHash, isValidPassword, PRIVATE_KEY } from '../util.js';
import GitHubStrategy from 'passport-github2';
import jwtStrategy from 'passport-jwt';

//  Declaramos estrategia
const localStrategy = passportLocal.Strategy;
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
  /**
        *  Inicializando la estrategia local, username sera para nosotros email.
        *  "Done" será nuestro callback
  */

  //Estrategia de obtener Token JWT por Cookie:
  passport.use('jwt', new JwtStrategy(
    {
      jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
      secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
      // console.log("Entrando a passport Strategy con JWT.");
      try {
        return done(null, jwt_payload.user);
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  ));

  // Usando GitHub
  passport.use('github', new GitHubStrategy(
    {
      clientID: 'Iv1.9bf11d74a4b1e425',
      clientSecret: '1dafe63d7e9e51608732d7e0ada4ad28d5b86c30',
      callbackUrl: 'http://localhost:8080/api/users/githubcallback'
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("Profile obtenido del usuario de GitHub: ");
      // console.log(profile);
      try {
        //Validamos si el user existe en la DB
        // const user = await userModel.findOne({ email: profile._json.email });
        const user = await userModel.findOne({ $or: [{ email: profile._json.email }, { username: profile._json.login }] });
        if (!user) {
          let newUser = {
            username: profile._json.login,
            email: profile._json.url,
            password: 'gitHubUserPass',
            loggedBy: "GitHub",
            type: "user"
          }
          const result = await userModel.create(newUser);
          return done(null, result)
        } else {
          // Si entramos por aca significa que el user ya existe en la DB
          return done(null, user)
        }

      } catch (error) {
        return done(error)
      }
    }
  ));

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
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user)
    } catch (error) {
      console.error("Error deserializando el usuario: " + error);
    }
  });
};

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) { //Validamos que exista el request y las cookies.
      token = req.cookies['jwtCookieToken'];
  }
  return token;
};

export default initializePassport;