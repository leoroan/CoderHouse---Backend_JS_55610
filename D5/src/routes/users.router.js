import { Router } from "express";
import UserDAO from "../daos/dbManager/user.dao.js";

const router = Router();
const userDao = new UserDAO();

router.get('/profile/:uid', async (req, res) => {
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

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, type } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }

    //Validamos si el user existe en la DB
    const exist = await UserDAO.getUserByEmail(email);
    if (exist) {
      return res.status(400).send({ status: 'error', message: "Usuario ya existe!" })
    }

    const user = await UserDAO.createUser({ username, email, password, type });
    res.send({ status: "success", message: "User crated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserDAO.getUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });

    } else if (user.password === password) {

      const userProfileWithoutSensitiveInfo = { ...user.toObject(), password: undefined };

      req.session.user = userProfileWithoutSensitiveInfo;
      req.session.save();

      return res.json({ message: 'Login successful', payload: req.session.user });
    }

  } catch (error) {
    console.error(error);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.json({ error: 'Error logout', msg: "Error al cerrar la session" })
    }
    res.send('Session cerrada correctamente!')
  })
});

export default router;