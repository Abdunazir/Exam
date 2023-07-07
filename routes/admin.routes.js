const Router = require("express");
const {
  addAdmin,
  getAllAdmins,
  updateAdmin,
  loginAdmin,
  deleteAdmin,
  getAdmins,
  logoutAdmin,
} = require("../controller/admin.Controller");
const adminPolice = require("../middleware/adminPolice");
const adminCreatorPolice = require("../middleware/adminCreatorPolice");
const Validator = require("../middleware/validator");
const router = Router();

router.post("/add", Validator("admin"), adminCreatorPolice, addAdmin);
router.get("/", adminPolice, getAdmins);
router.put("/:id", Validator("admin"), updateAdmin);
router.delete("/:id", adminCreatorPolice, deleteAdmin);
router.post("/login", loginAdmin);
router.post("/out", logoutAdmin);
module.exports = router;
