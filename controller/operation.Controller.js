const pool = require("../config/db");

const { errorHandler } = require("../helpers/error_handler");

const addOperation = async (req, res) => {
  try {
    const { order_id, status_id, operation_date, admin_id, description } =
      req.body;

    const newOperation = await pool.query(
      `INSERT INTO "operation" (order_id,
      status_id,
      operation_date,
      admin_id,
      description) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [order_id, status_id, operation_date, admin_id, description]
    );
    res.status(200).json({ message: "Operation added" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getOperations = async (req, res) => {
  try {
    const newOperation = await pool.query(`SELECT * FROM "operation"`);
    res.status(200).json(newOperation.rows);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateOperation = async (req, res) => {
  try {
    const id = req.params.id;
    const { order_id, status_id, operation_date, admin_id, description } =
      req.body;
    const newOperation = await pool.query(
      `UPDATE "operation" SET 
      order_id=$1,
      status_id=$2,
      operation_date=$3,
      admin_id=$4,
      description=$5 WHERE id=$6 RETURNING *`,
      [order_id, status_id, operation_date, admin_id, description, id]
    );
    res.status(200).json({ message: "Operation successfully updated" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteOperation = async (req, res) => {
  try {
    const id = req.params.id;
    const newOperation = await pool.query(
      `DELETE FROM "operation" WHERE id=$1`,
      [id]
    );
    if (!newOperation || !newOperation.rowCount > 0) {
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
  addOperation,
  getOperations,
  updateOperation,
  deleteOperation,
};
