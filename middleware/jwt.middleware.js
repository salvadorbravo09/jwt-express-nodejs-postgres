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
    const { email, role_id } = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token y extrae el email
    req.email = email; // Guarda los datos del usuario para su uso en otras rutas
    req.role_id = role_id;
    next(); // Llama a la siguiente funcion middleware si la verificacion esta OK
  } catch (error) {
    return res.status(400).json({ msg: "Token invalido" });
  }
};

export const verifyAdmin = (req, res, next) => {
  // Verifica si el role_id es 1 (administrador)
  if (req.role_id === 1) {
    return next();
  }
  // Retorna error si el usuario no es administrador
  return res.status(403).json({ error: "No autorizado, solo administradores" });
};

export const verifyVet = (req, res, next) => {
  // Verifica si el role_id es 2 (veterinario) o si es role_id 1 (administrador)
  if (req.role_id === 2 || req.role_id === 1) {
    return next();
  }
  return res.status(403).json({ error: "No autorizado, solo veterinarios" });
};
