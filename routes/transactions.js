const express = require("express");
const router = express.Router();
// const Transactions = require("../fake-data/Transactions");
const TransactionTable = require("../DB/models").Transaction;
const transactionValidator = require("../modules/transaction-validtor");
const Controller = require("../contoroller/transaction/transaction");
const controller = new Controller(TransactionTable, transactionValidator);
const reqHandler = require("../middleware/req-handel");

router.get("/", reqHandler(controller.getTransactions.bind(controller)));
router.get("/:id", reqHandler(controller.getTransaction.bind(controller)));
router.post("/", reqHandler(controller.createTransaction.bind(controller)));
router.put("/:id", reqHandler(controller.updateTransaction.bind(controller)));
router.delete(
  "/:id",
  reqHandler(controller.deleteTransaction.bind(controller))
);

module.exports = router;
