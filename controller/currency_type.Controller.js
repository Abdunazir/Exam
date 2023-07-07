const pool = require("../config/db");

const { errorHandler } = require("../helpers/error_handler");

const addCurrency_type = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCurrency_type = await pool.query(
      `INSERT INTO currency_type (name, description) VALUES ($1, $2) RETURNING *`,
      [name, description]
    );
    res.status(200).json({ message: "Currency_type added" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCurrency_type = async (req, res) => {
  try {
    const newCurrency_type = await pool.query(`SELECT * FROM currency_type`);
    res.status(200).json(newCurrency_type.rows);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateCurrency_type = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const newCurrency_type = await pool.query(
      `UPDATE currency_type SET 
      name=$1, description=$2 WHERE id=$3 RETURNING *`,
      [name, description, id]
    );
    res.status(200).json({ message: "Currency_type successfully updated" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteCurrency_type = async (req, res) => {
  try {
    const id = req.params.id;
    const newCurrency_type = await pool.query(`DELETE FROM currency_type WHERE id=$1`, [id]);
    if (!newCurrency_type || !newCurrency_type.rowCount > 0) {
      return res.Currency_type(400).send({
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
  addCurrency_type,
  getCurrency_type,
  updateCurrency_type,
  deleteCurrency_type,
};
