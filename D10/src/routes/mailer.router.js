import { Router } from "express";
import { sendForgotMail, sendMail } from "../controllers/nodemailer.controller.js";
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
router.post('/forgot-password', async (req, res) => {
  try {
    const result = await sendForgotMail(req.body.email, req.body.attachments);
    res.status(200).json({ message: 'Correo electrónico de restablecimiento enviado correctamente', messageId: result.messageId });
  } catch (error) {
    console.error('Error al enviar el correo electrónico de restablecimiento:', error);
    res.status(500).json({ error: 'Ocurrió un error al enviar el correo electrónico de restablecimiento' });
  }
});

// Ruta para restablecer la contraseña
router.get('/reset-password', (req, res) => {
  const { token } = req.query;

  // Verifica si el token es válido (existe en tu base de datos y no ha expirado)
  // Si el token es válido, muestra un formulario para ingresar la nueva contraseña
  // Cuando el usuario envíe el formulario, actualiza la contraseña en tu base de datos

  res.send(`
    <form method="POST" action="/reset-password">
      <input type="hidden" name="token" value="${token}">
      <label>Nueva contraseña:</label>
      <input type="password" name="password">
      <button type="submit">Restablecer contraseña</button>
    </form>
  `);

  app.post('/reset-password', (req, res) => {
    const { token, password } = req.body;

    // Verifica si el token es válido (existe en tu base de datos y no ha expirado)
    // Si el token es válido, actualiza la contraseña en tu base de datos
    // Hashea la contraseña antes de almacenarla utilizando bcrypt u otro algoritmo seguro

    res.send('Contraseña restablecida correctamente');
  });
});



export default router;