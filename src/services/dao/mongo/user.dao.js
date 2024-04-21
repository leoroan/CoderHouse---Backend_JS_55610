import { userModel } from "../../../models/user.model.js";


class UserDAO {

  async createUser(user) {
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

  async getUserByEmail(email) {
    try {
      return await userModel.findOne({ email: email });
    } catch (error) {
      throw error;
    }
  }

  async getUsersByLastConnection(sinceDays) {
    try {
      return await userModel.find({ last_connection: { $lt: sinceDays } });
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      return await userModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      return await userModel.find();
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, user) {
    try {
      return await userModel.findByIdAndUpdate(id, user);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      return await userModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteIdles(date) {
    try {
      return await userModel.deleteMany({ last_connection: { $lt: date } });
    } catch (error) {
      throw error;
    }
  }

}


export default UserDAO;