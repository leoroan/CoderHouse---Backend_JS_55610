import { Router } from "express";
import { sendForgotMail, sendMail } from "../controllers/nodemailer.controller.js";
import { getToken, getPassword } from "../controllers/users.controller.js";
import { comparePasswords, createHash } from "../utils/bcrypt.js";
import { userService } from "../services/repository/services.js";
const router = Router();

router.post("/send-mail", async (req, res) => {
  try {
    const result = await sendMail(req.body.email, req.body.subject, req.body.html, req.body.attachments);
    res.status(200).json({ message: 'Correo electrónico enviado correctamente', messageId: result.messageId });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ error: 'Ocurrió un error al enviar el correo electrónico' });
  }
});

router.post('/forgot-password/', async (req, res) => {
  try {
    const result = await sendForgotMail(req.body.email, req.body.attachments);
    res.status(200).json({ message: 'Correo electrónico de restablecimiento enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico de restablecimiento:', error);
    res.status(500).json({ error: `Ocurrió un error al enviar el correo electrónico de restablecimiento: ${error.message}` });
  }
});

router.get('/reset-password', async (req, res) => {
  const token = req.query.token;
  const uid = req.query.uid;
  const { resultToken, tokenTime } = await getToken(uid);
  if (!resultToken || tokenTime < Date.now()) {
    return res.status(401).send('Token inválido o expirado');
  }
  res.render('resetPasword', { uid: req.query.uid });
});

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const uid = req.query.uid;
  const { resultToken, tokenTime } = await getToken(uid);
  const userPassword = await getPassword(uid);

  if (!resultToken || tokenTime < Date.now()) {
    if (tokenTime < Date.now()) {
      res.render('reresetpassword');
    }
    return res.status(401).send('Token inválido');
  }
  const match = comparePasswords(password, userPassword.password);
  if (match) {
    return res.status(401).send('La contraseña no puede ser igual a la anterior');
  }
  const hashedPassword = createHash(password);
  const result = userService.updateUser(req.query.uid, { password: hashedPassword, resetToken: null, resetTokenExpiration: null });
  res.send('Contraseña restablecida correctamente');
});


export default router;