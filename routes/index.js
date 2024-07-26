const express = require("express");
const UserRouter = require("./user");
const CartRouter = require("./cart");
const DroneRouter = require("./drone");
const OrderRouter=require("./order")
const cors = require("cors");

const router = express.Router();
router.use(cors());
router.use("/user",UserRouter);
router.use("/user/cart",CartRouter);
router.use("/drone",DroneRouter);
router.use("/order",OrderRouter);
module.exports = router;