import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../utils/jwt.js";

export const verificarPropietarioCarritoMiddleware = (req, res, next) => {
  const ownerId = req.query.oid;
  const authHeader = req.cookies;

  if (!authHeader) {
    return res.status(401).send({ error: "User not authenticated or missing token." });
  }

  const token = authHeader['jwtCookieToken'];

  jwt.verify(token, PRIVATE_KEY, (error, credential) => {
    if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" });
    const user = credential.user;

    if (user._id === ownerId) {
      return res.status(403).json({ message: "No puedes agregar este producto al carro de compras." });
    }
    next();
  });
}

export const verificarPropietarioMiddleware = (req, res, next) => {
  const ownerId = req.query.oid;
  const authHeader = req.cookies;

  if (!authHeader) {
    return res.status(401).send({ error: "User not authenticated or missing token." });
  }

  const token = authHeader['jwtCookieToken'];

  jwt.verify(token, PRIVATE_KEY, (error, credential) => {
    if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" });
    const user = credential.user;

    if (user.type === "admin") {
      next();
      return;
    }
    if (user._id !== ownerId) {
      return res.status(403).json({ message: "No tienes permiso para realizar esta acción." });
    }
    next();
  });

};