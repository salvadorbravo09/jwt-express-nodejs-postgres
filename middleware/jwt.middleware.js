import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Obtiene el token del encabezado de autorizacion
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "Token no proporcionado" });
  }

  // Extrae el token del formato "Bearer <token>"
  token = token.split(" ")[1];

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token y extrae el email
    req.email = email; // Guarda los datos del usuario para su uso en otras rutas
    next(); // Llama a la siguiente funcion middleware si la verificacion esta OK
  } catch (error) {
    return res.status(400).json({ msg: "Token invalido" });
  }
};
