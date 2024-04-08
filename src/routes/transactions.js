const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const TransactionTable = require("../models").Transaction;
const UserTable = require("../models").User;
const AccountTable = require("../models").Account;
const CategoryTable = require("../models").Category;
const transactionValidator = require("../modules/transaction-validtor");
const Controller = require("../contoroller/transaction/transaction");
const controller = new Controller(
  TransactionTable,
  transactionValidator,
  UserTable,
  AccountTable,
  CategoryTable
);
const reqHandler = require("../middleware/req-handel");

router.post("/", reqHandler(controller.create.bind(controller)));
router.patch("/:id", reqHandler(controller.update.bind(controller)));
router.delete("/:id", reqHandler(controller.delete.bind(controller)));
router.get("/", reqHandler(controller.getAll.bind(controller)));

module.exports = router;
