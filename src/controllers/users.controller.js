import { UserDTO } from "../services/dto/user.dto.js";
import { userService } from "../services/repository/services.js";
import { sendMail } from './nodemailer.controller.js';

export const getUserProfileController = async (req, res) => {
  try {
    const userId = req.params.uid;
    const userProfile = await userService.getUserById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = new UserDTO(userProfile.username, userProfile.email, userProfile.type)
    console.log(user);
    res.json({ userProfile: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getToken = async (userId) => {
  try {
    const userProfile = await userService.getUserById(userId);
    if (!userProfile) {
      return ({ error: 'User not found' });
    }
    return ({ resultToken: userProfile.resetToken, tokenTime: userProfile.resetTokenExpiration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const getPassword = async (userId) => {
  try {
    const userProfile = await userService.getUserById(userId);
    if (!userProfile) {
      return ({ error: 'User not found' });
    }
    return ({ password: userProfile.password });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const updateUserRol = async (req, res) => {
  const userId = req.params.uid;
  const user = await userService.getUserById(userId);
  let nuevoRol = user.rol;
  const docs = user.documents;
  const generalDoc = docs.filter(doc => doc.tipo === "gralDocs");

  if (user.rol == "premium") {
    nuevoRol = "standar";
  } else {
    if (generalDoc.length !== 0) {
      nuevoRol = "premium";
    }
    else { return false; }
  }
  return userService.updateUser(userId, { rol: nuevoRol })
}

export const deleteInactiveUsers = async (req, res) => {
  try {
    let cantDias;
    if (req.query.dias) {
      cantDias = new Date(Date.now() - req.query.dias * 24 * 60 * 60 * 1000);
    } else {
      cantDias = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    }
    const inactiveUsers = await userService.getUsersByLastConnection(cantDias);
    if (inactiveUsers.length === 0) {
      return res.status(404).json({ error: 'No hay usuarios inactivos para eliminar' });
    }
    inactiveUsers.forEach(async (user) => {
      await sendMail(user.email, 'Eliminación de cuenta de UR-SHOP! por inactividad', ` ${user.username}, Tu cuenta ha sido eliminada debido a inactividad.`);
    });

    await userService.deleteIdles(cantDias);
    res.status(200).json({ message: 'Usuarios inactivos eliminados exitosamente', inactiveUsers: inactiveUsers });
  } catch (error) {
    console.error('Error al limpiar usuarios inactivos:', error);
    res.status(500).json({ error: 'Error al limpiar usuarios inactivos' });
  }
}

export const deleteInactiveUsersMocked = async (req, res) => {
  try {
    let cantDias;
    if (req.query.dias) {
      cantDias = new Date(Date.now() - req.query.dias * 24 * 60 * 60 * 1000);
    } else {
      cantDias = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    }
    const inactiveUsers = await userService.getUsersByLastConnection(cantDias);
    if (inactiveUsers.length === 0) {
      return { error: 'No hay usuarios inactivos para eliminar' };
    }
    return inactiveUsers;
  } catch (error) {
    console.error('Error al limpiar usuarios inactivos:', error);
  }
}

export const deleteUser = async (req, res, userEmail) => {
  try {
    console.log(userEmail);
    const deletedUser = await userService.deleteUserByEmail(userEmail);
    if (deletedUser) {
      res.status(200).json({ message: 'Usuario eliminado correctamente', deletedUser });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
}

export const modifyUser = async (req, res, userEmail) => {
  const user = await userService.getUserByEmail(userEmail);
  const userId = user._id;
  let nuevoRol = user.rol;
  if (user.rol == "premium") {
    nuevoRol = "standar";
  } else {
    nuevoRol = "premium";
  }
  await userService.updateUser(userId, { rol: nuevoRol })
  res.status(200).json({ message: 'Usuario eliminado correctamente', user });
}