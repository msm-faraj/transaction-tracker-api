const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
// const Transactions = require("../fake-data/Transactions");
const TransactionTable = require("../DB/models").Transaction;
const transactionValidator = require("../modules/transaction-validtor");
const Controller = require("../contoroller/transaction/transaction");
const controller = new Controller(TransactionTable, transactionValidator);
const reqHandler = require("../middleware/req-handel");

router.post("/", auth, reqHandler(controller.create.bind(controller)));
router.put("/:id", auth, reqHandler(controller.update.bind(controller)));
router.delete("/:id", auth, reqHandler(controller.delete.bind(controller)));
router.get("/:id", auth, reqHandler(controller.getOne.bind(controller)));
router.get("/", auth, reqHandler(controller.getAll.bind(controller)));

module.exports = router;
