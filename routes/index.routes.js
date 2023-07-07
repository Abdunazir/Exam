const { Router } = require("express");

// const clientRouters = require("./client.routes");
// const otpRouters = require("./otp.routes");
const adminRouter = require("./admin.routes");
const operationRouter = require("./operation.routes");
const orderRouter = require("./order.routes");
const statusRouter = require("./status.routes");
const currency_typeRouter = require("./currency_type.routes");

const router = Router();

router.use("/admin", adminRouter);
router.use("/operation", operationRouter);
router.use("/order", orderRouter);
router.use("/status", statusRouter);
router.use("/currency_type", currency_typeRouter);
// router.use("/client", clientRouters);
// router.use("/otp", otpRouters);
module.exports = router;
