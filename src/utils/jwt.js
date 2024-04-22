import jwt from 'jsonwebtoken';

export const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

export const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '1h' })
}

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "User not authenticated or missing token." });
  }
  const token = authHeader.split(' ')[1]; 
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" });
    req.user = credentials.user;
    next();
  })
}

export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT")
    if (req.user.role !== role) {
      return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol.");
    }
    next()
  }
};