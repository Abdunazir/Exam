const pool = require("../config/db");
const uuid = require("uuid");

const { errorHandler } = require("../helpers/error_handler");

const addOrder = async (req, res) => {
  try {
    const {
      full_name,
      phone_number,
      product_link,
      summa,
      currency_type_id,
      truck,
      email,
      description,
    } = req.body;

    const newOrder = await pool.query(
      `INSERT INTO "order" (order_unique_id,
      full_name,
      phone_number,
      product_link,
      summa,
      currency_type_id,
      truck,
      email,
      description) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9) RETURNING *`,
      [
        uuid.v4(),
        full_name,
        phone_number,
        product_link,
        summa,
        currency_type_id,
        truck,
        email,
        description,
      ]
    );
    res.status(200).json({ message: "Order added" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getOrders = async (req, res) => {
  try {
    const newOrder = await pool.query(`SELECT * FROM "order"`);
    res.status(200).json(newOrder.rows);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      order_unique_id,
      full_name,
      phone_number,
      product_link,
      summa,
      currency_type_id,
      truck,
      email,
      description,
    } = req.body;
    const newOrder = await pool.query(
      `UPDATE "order" SET 
      order_unique_id=$1,
      full_name=$2,
      phone_number=$3,
      product_link=$4,
      summa=$5,
      currency_type_id=$6,
      truck=$7,
      email=$8,
      description=$9 WHERE id=$10 RETURNING *`,
      [
        order_unique_id,
        full_name,
        phone_number,
        product_link,
        summa,
        currency_type_id,
        truck,
        email,
        description,
        id,
      ]
    );
    res.status(200).json({ message: "Order successfully updated" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const newOrder = await pool.query(`DELETE FROM "order" WHERE id=$1`, [id]);
    if (!newOrder || !newOrder.rowCount > 0) {
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
  addOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
