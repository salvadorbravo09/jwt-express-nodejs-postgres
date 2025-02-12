import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = Router();

// Rutas publicas
router.post("/register", UserController.register);
router.post("/login", UserController.login);
// Rutas protegidas (verificacion del token)
router.get("/profile", verifyToken, UserController.profile);

export default router;
