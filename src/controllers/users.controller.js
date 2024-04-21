import { UserDTO } from "../services/dto/user.dto.js";
import { userService } from "../services/repository/services.js";

//Get user profile
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
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); 
    const inactiveUsers = await userService.getUsersByLastConnection(twoDaysAgo);
    // const inactiveUsers = await userModel.find({ last_connection: { $lt: twoDaysAgo } });
    if (inactiveUsers.length === 0) {
      return res.status(404).json({ error: 'No hay usuarios inactivos para eliminar' });
    }
    // Envía un correo electrónico a cada usuario inactivo antes de eliminarlos
    // inactiveUsers.forEach(async (user) => {
    //   await sendEmail(user.email, 'Eliminación de cuenta por inactividad', 'Tu cuenta ha sido eliminada debido a inactividad.');
    // });

    // Elimina los usuarios inactivos de la base de datos
    await userService.deleteIdles(twoDaysAgo);

    // res.status(200).json({ message: 'Usuarios inactivos eliminados exitosamente', inactiveUsers:inactiveUsers  });
    res.status(200).json({ message: 'Usuarios inactivos eliminados exitosamente', inactiveUsers:inactiveUsers  });
  } catch (error) {
    console.error('Error al limpiar usuarios inactivos:', error);
    res.status(500).json({ error: 'Error al limpiar usuarios inactivos' });
  }
}