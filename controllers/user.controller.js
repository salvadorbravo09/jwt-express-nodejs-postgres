import bcryptjs from "bcryptjs";
import { UserModel } from "../models/user.model.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Se requiere los campos: email, password, username" });
    }

    const userByEmail = await UserModel.findOneByEmail(email);
    if (userByEmail) {
      return res.status(409).json({ msg: "El email ya existe" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      username,
    });

    return res.status(201).json({ msg: newUser });
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
