import bcrypt from 'bcrypt';

// Generamos el hash
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validamos el hash
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

export const comparePasswords = (userInputPassword, storedHash) => {
    return bcrypt.compareSync(userInputPassword, storedHash);
}