const pool = require("../config/db");
const bcrypt = require("bcrypt");
const config = require("config");
const { errorHandler } = require("../helpers/error_handler");
const myJwt = require("../services/JwtService");
const { admin } = require("../validations");

const addAdmin = async (req, res) => {
  try {
    const {
      full_name,
      user_name,
      hashed_password,
      phone_number,
      email,
      tg_link,
      // token,
      is_creator,
      is_active,
      description,
    } = req.body;

    const checkAdmin = await pool.query(
      `SELECT * FROM admin WHERE user_name=$1 and email=$2`,
      [user_name, email]
    );
    if (checkAdmin.rows[0]) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(hashed_password, 7);
    const newAdmin = await pool.query(
      `INSERT INTO admin (full_name,
      user_name,
      hashed_password,
      phone_number,
      email,
      tg_link,
      is_creator,
      is_active,
      description) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9) RETURNING *`,
      [
        full_name,
        user_name,
        hashedPassword,
        phone_number,
        email,
        tg_link,
        is_creator,
        is_active,
        description,
      ]
    );

    const payload = {
      id: newAdmin.rows[0].id,
      is_creator: newAdmin.rows[0].is_creator,
      is_active: newAdmin.rows[0].is_active,
      adminRoles: ["WRITE", "READ", "DELETE"],
    };

    const tokens = myJwt.genereateTokens(payload);
    const refreshToken = tokens.refreshToken;

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    const hashedToken = bcrypt.hashSync(refreshToken, 7);

    await pool.query(`UPDATE admin SET hashed_token=$1`, [hashedToken]);

    res.status(200).json({ message: "Admin added" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, hashed_password } = req.body;
    console.log(444, email, hashed_password);
    if (!hashed_password || !email) {
      return res.status(400).send({ message: "Enter email and password" });
    }

    const admin = await pool.query(
      `Select * from admin where email
    =$1`,
      [email]
    );
    if (!admin) {
      return res
        .status(400)
        .send({ message: "Email or password is incorrect" });
    }

    const validPassword = await bcrypt.compare(
      hashed_password,
      admin.rows[0].hashed_password
    );

    if (!validPassword) {
      return res
        .status(400)
        .send({ message: "Email or password is incorrect" });
    }

    const payload = {
      id: admin.rows[0].id,
      is_active: admin.rows[0].is_active,
      is_creator: admin.rows[0].creator,
      adminRoles: ["WRITE", "READ", "DELETE"],
    };

    const tokens = myJwt.genereateTokens(payload);
    const refreshToken = tokens.refreshToken;

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    const hashedToken = bcrypt.hashSync(refreshToken, 7);

    await pool.query(`UPDATE admin SET hashed_token=$1`, [hashedToken]);

    res.status(200).send({ tokens });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const logoutAdmin = async (req, res) => {
  const { refreshToken } = req.cookies;
  let Admin;
  const decodedToken = await myJwt.verifyRefresh(refreshToken);
  if (!refreshToken) {
    return res.status(400).send({ message: "Token is not defined!" });
  }
  Admin = await pool.query(`UPDATE admin SET hashed_token=$1 WHERE id=$2`, [
    "",
    decodedToken.id,
  ]);
  console.log(decodedToken);
  res.status(200).send(Admin.rows);
};

const getAdmins = async (req, res) => {
  try {
    const newAdmin = await pool.query(`SELECT * FROM admin`);
    res.status(200).json(newAdmin.rows);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      full_name,
      user_name,
      hashed_password,
      phone_number,
      email,
      tg_link,
      hashed_token,
      is_creator,
      is_active,
      description,
    } = req.body;
    const newAdmin = await pool.query(
      `UPDATE admin SET 
            full_name=$1,
        user_name=$2,
        hashed_password=$3,
        phone_number=$4,
        email=$5,
        tg_link=$6,
        hashed_token=$7,
        is_creator=$8,
        is_active=$9,
        description=$10 WHERE id=$11 RETURNING *`,
      [
        full_name,
        user_name,
        hashed_password,
        phone_number,
        email,
        tg_link,
        hashed_token,
        is_creator,
        is_active,
        description,
        id,
      ]
    );
    res.status(200).json({ message: "Admin successfully updated" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const newAdmin = await pool.query(`DELETE FROM admin WHERE id=$1`, [id]);
    if (!newAdmin || !newAdmin.rowCount > 0) {
      return res.status(400).send({
        message: "Not found id",
      });
    }
    res.status(200).send({
      message: "Deleted successfully",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addAdmin,
  loginAdmin,
  logoutAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
};
