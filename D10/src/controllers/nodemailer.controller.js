import transporter from '../utils/mail.js';
import { uuid } from 'uuidv4';

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

export const sendForgotMail = async (email, attachments) => {
  try {
    const token = uuid();
    // Aquí deberías almacenar el token en tu base de datos
    // junto con el correo electrónico y la marca de tiempo

    const result = await transporter.sendMail({
      from: 'UR-SHOP!',
      to: email,
      subject: 'Restablece tu contraseña',
      html: `
      <p>Haz clic en el siguiente botón para restablecer tu contraseña:</p>
      <a href="http://127.0.01:8080/mailer/reset-password?token=${token}">Restablecer contraseña</a>
    `,
      attachments: attachments
    });
    return `Correo electrónico de restablecimiento de cuenta, enviado a ${email}. ID del mensaje: ${result.messageId}`;
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento de contraseña:', error);
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

export const mensajeRegister = (username, urlEnlace) => {
  return `
  <h1>Hola ${username}!</h1>
  <p>Gracias por registrarte en UR-SHOP!</p>
  <p>Tu registro ha sido procesada y se encuentra en proceso de revision hasta que no valides tu direccion de correo electrónico!.</p>
  
  <p> hace click en el siguiente enlace $(urlEnlace) para verificar tu cuenta!</p>
  <p>¡Gracias por confiar en nosotros!</p>
  `;
}