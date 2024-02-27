import transporter from '../config/nodemailer.config.js';

export const sendMail = async (email, subject, html, attachments) => {
  try {
    if (!email || !subject || !html) {
      throw new Error('Dirección de correo electrónico, asunto y contenido HTML son obligatorios.');
    }

    const result = await transporter.sendMail({
      from: 'UR-SHOP!',
      to: email,
      subject: subject,
      html: html,
      attachments: attachments
    });

    return `Correo electrónico enviado a ${email}. ID del mensaje: ${result.messageId}`;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw error;
  }
};

export const mensajeCompra = (username, amount, code) => {
  return `
  <h1>Hola ${username}!</h1>
  <p>Gracias por tu compra en UR-SHOP!</p>
  <p>Tu compra ha sido procesada y se encuentra en proceso de envío.</p>
  <p>El monto total de tu compra es de $${amount}.</p>
  <p>Tu código de compra es ${code}.</p>
  <p>¡Gracias por confiar en nosotros!</p>
  `;
}