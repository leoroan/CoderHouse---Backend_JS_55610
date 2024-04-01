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
    // const userProfileWithoutSensitiveInfo = { ...userProfile.toObject(), password: undefined };
    // res.json({ userProfile: userProfileWithoutSensitiveInfo });
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

  if (user.rol === "premium") {
    nuevoRol = "standar";
  } else {
    nuevoRol = "premium";
  }
  return userService.updateUser(userId, { rol: nuevoRol })
}
