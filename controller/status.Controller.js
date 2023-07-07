const pool = require("../config/db");

const { errorHandler } = require("../helpers/error_handler");

const addStatus = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newStatus = await pool.query(
      `INSERT INTO status (name, description) VALUES ($1, $2) RETURNING *`,
      [name, description]
    );
    res.status(200).json({ message: "Status added" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getStatus = async (req, res) => {
  try {
    const newStatus = await pool.query(`SELECT * FROM status`);
    res.status(200).json(newStatus.rows);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const newStatus = await pool.query(
      `UPDATE status SET 
      name=$1, description=$2 WHERE id=$3 RETURNING *`,
      [name, description, id]
    );
    res.status(200).json({ message: "Status successfully updated" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const newStatus = await pool.query(`DELETE FROM status WHERE id=$1`, [id]);
    if (!newStatus || !newStatus.rowCount > 0) {
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
  addStatus,
  getStatus,
  updateStatus,
  deleteStatus,
};
