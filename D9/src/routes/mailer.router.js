import { Router } from "express";
import { sendMail } from "../controllers/nodemailer.controller.js";
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

export default router;