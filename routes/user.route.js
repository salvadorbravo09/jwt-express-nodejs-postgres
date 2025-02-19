import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken } from "../middleware/jwt.middleware.js";

const router = Router();

// Rutas publicas
router.post("/register", UserController.register);
router.post("/login", UserController.login);
// Rutas protegidas (verificacion del token)
router.get("/profile", verifyToken, UserController.profile);

// Rutas administrador
// Primero verifica que el token sea valido, que sea admin y luego entra al controlador
router.get("/", verifyToken, verifyAdmin, UserController.findAll);
router.put('/update-role-vet/:uid', verifyToken, verifyAdmin, UserController.updateRoleVet)

export default router;
