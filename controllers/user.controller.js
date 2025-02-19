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
      { email: newUser.email, role_id: newUser.role_id },
      process.env.JWT_SECRET,
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
    const { email, password } = req.body;

    // Verificamos los campos
    if (!email || !password) {
      res.status(400).json({ msg: "Se requiere los campos: email, password" });
    }

    // Buscamos el email en la BD y comprobamos si no existe
    const userExists = await UserModel.findOneByEmail(email);
    if (!userExists) {
      return res.status(404).json({ msg: "Usuario no existe" });
    }

    // Si el email existe
    const isMatch = await bcryptjs.compare(password, userExists.password); // Comparamos la contraseña enviada con la contraseña almacenada
    if (!isMatch) {
      return res.status(401).json({ msg: "Credenciales invalidas" });
    }

    // Generamos el token JWT usando el email del usuario existente
    const token = jwt.sign(
      { email: userExists.email, role_id: userExists.role_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Retorna el token con la respuesta
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error del servidor" });
  }
};

const profile = async (req, res) => {
  try {
    const user = await UserModel.findOneByEmail(req.email);
    return res.status(200).json({ msg: user });
  } catch (error) {
    return res.status(500).json({ msg: "Error del servidor" });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json({ msg: users });
  } catch (error) {
    return res.status(500).json({ msg: "Error del servidor" });
  }
};

export const UserController = {
  register,
  login,
  profile,
  findAll,
};
