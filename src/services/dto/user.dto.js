class UserDTO {
  constructor(username, email, type, last_connection) {
    this.username = username;
    this.email = email;
    this.type = type;
    this.last_connection = new Date(last_connection).toLocaleDateString('es-AR');

  }
}

export { UserDTO };