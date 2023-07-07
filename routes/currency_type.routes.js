const Router = require("express");
const {
  addCurrency_type,
  getCurrency_type,
  updateCurrency_type,
  deleteCurrency_type,
} = require("../controller/currency_type.Controller");
const adminPolice = require("../middleware/adminPolice");
const adminCreatorPolice = require("../middleware/adminCreatorPolice");
const Validator = require("../middleware/validator");
const router = Router();

router.post(
  "/add",
  adminCreatorPolice,
  Validator("currency_type"),

  addCurrency_type
);
router.get("/", adminPolice, getCurrency_type);
router.put(
  "/:id",
  adminCreatorPolice,
  Validator("currency_type"),

  updateCurrency_type
);
router.delete("/:id", adminPolice, deleteCurrency_type);

module.exports = router;
