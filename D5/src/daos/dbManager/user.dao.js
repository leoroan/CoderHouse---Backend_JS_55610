import { userModel } from "../../model/user.model.js";


class UserDAO {

  static async createUser(user) {
    try {
      const existingUser = await userModel.findOne({ email: user.email });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // If not, create the user
      return await userModel.create(user);
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      return await userModel.findOne({ email: email });
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      return await userModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      return await userModel.find();
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, user) {
    try {
      return await userModel.findByIdAndUpdate(id, user);
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      return await userModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

}


export default UserDAO;