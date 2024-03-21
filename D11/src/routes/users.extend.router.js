import CustomRouter from "./custom/custom.router.js";
import CartDao from "../services/dao/mongo/cart.dao.js"
import { generateJWToken } from "../utils/jwt.js";
import passport from 'passport';
import { updateUserRol } from "../controllers/users.controller.js";

//ejemplo de router para usuario con politicas (aunq por practicidad aca son todas publicas)
export default class UserExtendRouter extends CustomRouter {
  init() {
    const cartDao = new CartDao();

    this.get('/profile', ["USER", "ADMIN"], passport.authenticate('jwt', { session: false }), async (req, res) => {
      // getUserProfileController
      res.render('profile', {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "main.scripts.js",
        title: "user profile",
        user: req.user // Trtabajando con JWT
      })
    });

    this.get("/github", ["PUBLIC"], passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
      { }
    })

    this.get("/githubcallback", ["PUBLIC"], passport.authenticate('github', { failureRedirect: '/fail-login' }), async (req, res) => {
      const user = req.user;
      await cartDao.createCart(req.user._id);
      req.session.user = { ...user.toObject() }

      const access_token = generateJWToken(user)
      res.cookie('jwtCookieToken', access_token, { httpOnly: true });
      res.redirect("/");
    })

    this.post('/register', ["PUBLIC"], passport.authenticate('register', {
      failureRedirect: 'api/users/fail-register'
    }), async (req, res) => {
      await cartDao.createCart(req.user._id);
      res.status(201).send({ status: "success", message: "User crated successfully" });
    })

    this.post('/login', ["PUBLIC"], passport.authenticate('login',
      {
        failureRedirect: 'api/session/fail-login'
      }
    ), async (req, res) => {
      const user = req.user;
      req.session.user = { ...user.toObject() }
      if (!user) return res.status(401).send({ status: "error", error: "Wrong user/password credentials" });
      // Usando JWT 
      const access_token = generateJWToken(user)
      res.cookie('jwtCookieToken', access_token, { httpOnly: true });
      res.send({ access_token: access_token });
    })

    this.post('/logout', ["PUBLIC"], (req, res) => {
      res.clearCookie('jwtCookieToken');
      req.session.destroy(error => {
        if (error) {
          res.json({ error: 'Error logout', msg: "Error logging out" })
        }
        res.send('Session cerrada correctamente!')
      })
    });

    this.get("/fail-register", ["PUBLIC"], (req, res) => {
      res.status(401).send({ error: "Failed to register!" });
    });

    this.get("/fail-login", ["PUBLIC"], (req, res) => {
      res.status(401).send({ error: "Something went wrong, try again shortly!" });
    });

    this.post("/premium/:uid", ["PUBLIC"], (req, res) => {
      try {
        updateUserRol(req);
        req.session.destroy();
        res.status(201).send({ status: "success", message: "User updated successfully" });
      } catch (error) {
        res.status(401).send({ error: "Something went wrong, try again shortly!" });
      }
    });
  }
}





