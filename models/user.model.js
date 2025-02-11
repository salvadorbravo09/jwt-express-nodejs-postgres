import { pool } from "../config/database.js";

const create = async ({ email, password, username }) => {
  const query = {
    text: `
      INSERT INTO users (email, password, username)
      VALUES ($1, $2, $3)
      RETURNING email, username, uid
    `,
    values: [email, password, username],
  };

  const { rows } = await pool.query(query);
  return rows;
};

const findOneByEmail = async ({ email }) => {
  const query = {
    text: `
      SELECT uid, email, password, username
      WHERE email = $1
    `,
    values: [email],
  };
  const { rows } = await pool.query(query);
  return rows;
};

export const UserModel = {
  create,
  findOneByEmail,
};
