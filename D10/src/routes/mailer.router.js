import { Router } from "express";
import { sendForgotMail, sendMail } from "../controllers/nodemailer.controller.js";
import { getToken } from "../controllers/users.controller.js";
import { createHash } from "../utils/bcrypt.js";
import { userService } from "../services/repository/services.js";
const router = Router();

router.post("/send-mail", async (req, res) => {
  try {
    // console.log(req.body.email, req.body.subject, req.body.html, req.body.attachments);
    const result = await sendMail(req.body.email, req.body.subject, req.body.html, req.body.attachments);
    res.status(200).json({ message: 'Correo electrónico enviado correctamente', messageId: result.messageId });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ error: 'Ocurrió un error al enviar el correo electrónico' });
  }
});

// Ruta para solicitar recuperación de contraseña
router.post('/forgot-password/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await sendForgotMail(req.body.email, req.body.attachments, userId);
    res.status(200).json({ message: 'Correo electrónico de restablecimiento enviado correctamente', messageId: result.messageId });
  } catch (error) {
    console.error('Error al enviar el correo electrónico de restablecimiento:', error);
    res.status(500).json({ error: 'Ocurrió un error al enviar el correo electrónico de restablecimiento' });
  }
});

// Ruta para restablecer la contraseña
router.get('/reset-password', async (req, res) => {
  const token = req.query.token;
  const uid = req.query.uid;
  const { resultToken, tokenTime } = await getToken(uid);
  // Verifica si el token es válido (existe en tu base de datos y no ha expirado)
  if (!resultToken || tokenTime < Date.now()) {
    return res.status(401).send('Token inválido o expirado');
  }
  // Si el token es válido, muestra un formulario para ingresar la nueva contraseña
  // Cuando el usuario envíe el formulario, actualiza la contraseña en tu base de datos
  res.render('resetPasword', { uid: req.query.uid });
});

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const uid = req.query.uid;
  const { resultToken, tokenTime } = await getToken(uid);


  // if (!password) {
  //   return res.status(400).send('La contraseña es requerida');
  // }
  // if (password.length < 8) {
  //   return res.status(400).send('La contraseña debe tener al menos 8 caracteres');
  // }
  // if (!password.match(/[A-Z]/)) {
  //   return res.status(400).send('La contraseña debe tener al menos una letra mayúscula');
  // }
  // if (!password.match(/[0-9]/)) {
  //   return res.status(400).send('La contraseña debe tener al menos un número');
  // }
  // Verifica si el token es válido (existe en tu base de datos y no ha expirado)
  if (!resultToken || tokenTime < Date.now()) {
    return res.status(401).send('Token inválido o expirado');
  }
  // Hashea la contraseña antes de almacenarla utilizando bcrypt u otro algoritmo seguro
  const hashedPassword = createHash(password);
  console.log("pass:", password, "hashed: ", hashedPassword);
  // Si el token es válido, actualiza la contraseña en tu base de datos
  const result = userService.updateUser(req.query.uid, { password: hashedPassword, resetToken: null, resetTokenExpiration: null });

  res.send('Contraseña restablecida correctamente');
});


export default router;