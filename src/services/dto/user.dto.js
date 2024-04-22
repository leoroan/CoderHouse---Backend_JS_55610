class UserDTO {
  constructor(username, email, rol, last_connection) {
    this.username = username;
    this.email = email;
    this.rol = rol;
    this.last_connection = new Date(last_connection).toLocaleDateString('es-AR');

  }
}

export { UserDTO };