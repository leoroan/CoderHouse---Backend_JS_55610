export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createUser = (user) => {
    return this.dao.createUser(user);
  }

  getUserByEmail = (email) => {
    return this.dao.getUserByEmail(email);
  }

  getUserById = (id) => {
    return this.dao.getUserById(id);
  }

  getUsersByLastConnection = (date) => {
    return this.dao.getUsersByLastConnection(date);
  }

  getAllUsers = () => {
    return this.dao.getAllUsers();
  }

  deleteUser = (id) => {
    return this.dao.deleteUser(id);
  }

  deleteIdles = (date) => {
    return this.dao.deleteIdles(date);
  }

  updateUser = (id, user) => {
    return this.dao.updateUser(id, user);
  }

}