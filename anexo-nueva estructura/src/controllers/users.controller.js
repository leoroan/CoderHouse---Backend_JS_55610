import { UserDTO } from "../services/db/dto/user.dto.js";
import UserDAO from "../services/db/user.dao.js";

//Get user profile
export const getUserProfileController = async (req, res) => {
  try {
    const userId = req.params.uid;
    const userProfile = await UserDAO.getUserById(userId);
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

