# jwt-express-nodejs-postgres

## Documentación

### Pasos para la Configuración

1. **Crear archivo `.env`** para las variables de entorno.
2. **Configurar la conexión a la base de datos**:
   - Agregar la cadena de conexión al archivo `.env`.
   ```bash
   "postgresql://dbuser:secretpassword@database.server.com:3211/mydb"
   ```
3. **Generar el JWT SECRET**:
   - Ejecutar el siguiente comando en la terminal:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

## DDL de la Base de Datos PostgreSQL

```bash
DROP TABLE IF EXISTS USERS;

CREATE TABLE USERS (
    UID SERIAL PRIMARY KEY,
    EMAIL VARCHAR(50) NOT NULL UNIQUE,
    PASSWORD VARCHAR(60) NOT NULL,
    USERNAME VARCHAR(50) NOT NULL
);

-- Consultar todos los usuarios
SELECT * FROM USERS;
```
