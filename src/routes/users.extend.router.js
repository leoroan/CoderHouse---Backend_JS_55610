import CustomRouter from "./custom/custom.router.js";
import UserDAO from "../services/db/user.dao.js";
import CartDao from "../services/db/cart.dao.js"
import { createHash, isValidPassword, generateJWToken } from "../util.js";
import passport from 'passport';

//ejemplo de router para usuario con politicas (aunq por practicidad aca son todas publicas)
export default class UserExtendRouter extends CustomRouter {
  init() {
    const userDao = new UserDAO();
    const cartDao = new CartDao();

    this.get('/profile/:uid', ["PUBLIC"], async (req, res) => {
      try {
        const userId = req.params.uid;
        const userProfile = await UserDAO.getUserById(userId);
        if (!userProfile) {
          return res.status(404).json({ error: 'User not found' });
        }
        const userProfileWithoutSensitiveInfo = { ...userProfile.toObject(), password: undefined };
        res.json({ userProfile: userProfileWithoutSensitiveInfo });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
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
      // res.redirect("/")
    })

    // this.post('/register', async (req, res) => {
    //   try {
    //     const { username, email, password, type } = req.body;
    //     if (!username || !email || !password) {
    //       return res.status(400).json({ error: 'Invalid request parameters' });
    //     }
    //     const exist = await UserDAO.getUserByEmail(email);
    //     if (exist) {
    //       return res.status(400).send({ status: 'error', message: "Usuario existente!" })
    //     }
    //     const user = {
    //       username,
    //       email,
    //       password: createHash(password),
    //       type
    //     }

    //     const result = await UserDAO.createUser(user);
    //     await cartDao.createCart(result._id);
    //     res.send({ status: "success", message: "User crated successfully" });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal server error' });
    //   }
    // });

    // Register with passport
    this.post('/register', ["PUBLIC"], passport.authenticate('register', {
      failureRedirect: 'api/users/fail-register'
    }), async (req, res) => {
      await cartDao.createCart(req.user._id);
      res.status(201).send({ status: "success", message: "User crated successfully" });
    })

    // this.post('/login', async (req, res) => {
    //   try {
    //     const { email, password } = req.body;
    //     const user = await UserDAO.getUserByEmail(email);
    //     // if (!user || user.password !== password) {
    //     //   return res.status(401).json({ error: 'Invalid credentials' });
    //     // } else if (user.password === password) {
    //     //   const userProfileWithoutSensitiveInfo = { ...user.toObject(), password: undefined };
    //     //   req.session.user = userProfileWithoutSensitiveInfo;
    //     //   return res.json({ message: 'Login successful', payload: req.session.user });
    //     // }
    //     if (!user) return res.status(401).send({ status: 'error', error: "Wrong credentials" })
    //     if (!isValidPassword(user, password)) {
    //       return res.status(401).send({ status: "error", error: "Incorrect credentials" })
    //     }
    //     const userProfileWithoutSensitiveInfo = { ...user.toObject(), password: undefined };
    //     req.session.user = userProfileWithoutSensitiveInfo;
    //     return res.json({ message: 'Login successful', payload: req.session.user });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });

    // Login with passport
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
      // console.log(access_token);
      res.cookie('jwtCookieToken', access_token, { httpOnly: true });
      res.send({ access_token: access_token });
      // res.send({ status: "success", payload: user, access_token, message: "Login successful" });
      // res.send({ status: "success", payload: req.session.user, message: "Login successful" });
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
  }
}





