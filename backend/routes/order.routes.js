const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller");

router.get("/", controller.getOrders);
router.post("/", controller.createOrder);
router.put("/:id/status", controller.updateStatus);
router.delete("/:id", controller.cancelOrder);

module.exports = router;
