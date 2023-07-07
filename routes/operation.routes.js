const Router = require("express");
const {
  addOperation,
  getOperations,
  updateOperation,
  deleteOperation,
} = require("../controller/operation.Controller");
const adminPolice = require("../middleware/adminPolice");
const adminCreatorPolice = require("../middleware/adminCreatorPolice");
const Validator = require("../middleware/validator");
const router = Router();


router.post("/add", Validator("operation"), adminPolice,addOperation);
router.get("/",adminPolice, getOperations);
router.put("/:id", Validator("operation"),adminPolice, updateOperation);
router.delete("/:id",adminPolice, deleteOperation);

module.exports = router;
