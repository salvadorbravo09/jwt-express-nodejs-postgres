import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.POSTGRES_URL;

// Exporta la instancia para manejar la conexion a la base de datos
export const pool = new Pool({
  allowExitOnIdle: true,
  connectionString,
});

// Intenta realizar una consulta a la base de datos
try {
  await pool.query("SELECT NOW()");
  console.log("Database connected");
} catch (error) {
  console.log(error);
}
