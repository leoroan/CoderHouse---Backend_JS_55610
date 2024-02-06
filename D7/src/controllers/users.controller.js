import UserDAO from "../services/db/user.dao.js";
const userDao = new UserDAO();

//Get user profile
export const getUserProfileController = async (req, res) => {
  try {
    const userId = req.params.uid;
    const userProfile = await UserDAO.getUserById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userProfileWithoutSensitiveInfo = { ...userProfile.toObject(), password: undefined };
    res.json({ userProfile: userProfileWithoutSensitiveInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

