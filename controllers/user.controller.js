import bcryptjs from "bcryptjs";
import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    // Extrae los campos desde el request
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Se requiere los campos: email, password, username" });
    }

    // Busca un usuario existente por el email
    const userByEmail = await UserModel.findOneByEmail(email);
    if (userByEmail) {
      return res.status(409).json({ msg: "El email ya existe" });
    }

    // Hashea la contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Crea un nuevo usuario y genera el token JWT
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign(
      {
        email: newUser.email,
      },
      process.env.JWT_SECRET, // Clave secreta del JWT
      {
        expiresIn: "1h",
      }
    );

    // Devuelve el token en la respuesta
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error del servidor" });
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error del servidor" });
  }
};

export const UserController = {
  register,
  login,
};
