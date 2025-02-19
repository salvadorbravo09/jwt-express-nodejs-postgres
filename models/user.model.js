import { pool } from "../config/database.js";

const create = async ({ email, password, username }) => {
  const query = {
    text: `
      INSERT INTO users (email, password, username)
      VALUES ($1, $2, $3)
      RETURNING email, username, uid, role_id
    `,
    values: [email, password, username],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

const findOneByEmail = async (email) => {
  const query = {
    text: `
      SELECT * FROM users
      WHERE email = $1
    `,
    values: [email],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const findAll = async (req, res) => {
  const query = {
    text: `
      SELECT * FROM users
    `,
  };
  const { rows } = await pool.query(query);
  return rows;
};

const findOneByUid = async (uid) => {
  const query = {
    text: `
      SELECT * FROM users
      WHERE uid = $1
    `,
    values: [uid],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const updateRoleVet = async (uid) => {
  const query = {
    text: `
      UPDATE users
      SET role_id = 2
      WHERE uid = $1
      RETURNING email, username, role_id
    `,
    values: [uid],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

export const UserModel = {
  create,
  findOneByEmail,
  findAll,
  findOneByUid,
  updateRoleVet,
};
