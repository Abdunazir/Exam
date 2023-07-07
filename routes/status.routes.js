const Router = require("express");
const {
  addStatus,
  getStatus,
  updateStatus,
  deleteStatus,
} = require("../controller/status.Controller");
const adminPolice = require("../middleware/adminPolice");
const adminCreatorPolice = require("../middleware/adminCreatorPolice");
const Validator = require("../middleware/validator");
const router = Router();

router.post("/add", adminCreatorPolice, Validator("status"), addStatus);
router.get("/", adminCreatorPolice, getStatus);
router.put("/:id", Validator("status"), adminCreatorPolice, updateStatus);
router.delete("/:id", adminCreatorPolice, deleteStatus);

module.exports = router;
