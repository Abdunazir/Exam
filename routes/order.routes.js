const Router = require("express");
const {
  addOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/order.Controller");
// const adminPolice = require("../middleware/adminPolice");
// const adminActivePolice = require("../middleware/adminActivePolice");
const adminCreatorPolice = require("../middleware/adminCreatorPolice");
const Validator = require("../middleware/validator");
const router = Router();

// router.post("/add", Validator("admin"), addAdmin);
// router.get("/", adminPolice, getAllAdmins);
// router.put("/:id", Validator("admin"), adminActivePolice(), updateAdmin);
// router.post("/login", loginAdmin);
// router.delete("/:id", adminCreatorPolice(), deleteAdmin);
router.post("/add", Validator("order"), adminCreatorPolice, addOrder);
router.get("/", getOrders);
router.put("/:id", Validator("order"), updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
