import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.route.js";

// Crea una instancia de la aplicacion de express
const app = express();

// Middleware para enviar peticiones json
app.use(express.json());

// Middleware para enviar formularios a traves de HTML
app.use(express.urlencoded({ extended: true }));

// Middleware para las rutas de usuarios
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
