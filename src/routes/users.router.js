import { Router } from "express";
import UserDao from "../daos/dbManager/user.dao.js";

const router = Router();
const userDao = new UserDao();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }

    const user = await userDao.createUser({ username, email, password });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    
    } else if (user.password === password) {
      return res.json({ message: 'Login successful' });
    }
    res.json(user);

  } catch (error) {
    console.error(error);
  }
});

router.get('/profile/:uid', async (req, res) => {
  try {
    const userId = req.params.uid;
    const userProfile = await userDao.getUserById(userId);

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




export default router;