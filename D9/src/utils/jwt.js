import jwt from 'jsonwebtoken';

// JWT
//JSON Web Tokens JWT functinos:
export const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

/**
 * Generate token JWT usando jwt.sign:
 * Primer argumento: objeto a cifrar dentro del JWT
 * Segundo argumento: La llave privada a firmar el token.
 * Tercer argumento: Tiempo de expiración del token.
 */
export const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '1h' })
}

// authToken
export const authToken = (req, res, next) => {
  //El JWT token se guarda en los headers de autorización.
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "User not authenticated or missing token." });
  }
  const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra "Bearer asdfase56234234923".
  //Validar token
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" });
    //Token OK
    req.user = credentials.user;
    next();
  })
}
// para manejo de Auth
export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT")
    if (req.user.role !== role) {
      return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol.");
    }
    next()
  }
};