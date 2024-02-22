const express = require("express");
const router = express.Router();
const Accounts = require("../fake-data/Accounts");
const userValidator = require("../modules/account-validator");
const Controller = require("../contoroller/account/account");
const controller = new Controller(Accounts, userValidator);
const reqHandler = require("../middleware/req-handel");

router.get("/", reqHandler(controller.getAccounts.bind(controller)));
router.get("/:id", reqHandler(controller.getAccount.bind(controller)));
router.post("/", reqHandler(controller.createAccount.bind(controller)));
router.put("/:id", reqHandler(controller.updateAccount.bind(controller)));
router.delete("/:id", reqHandler(controller.deleteAccount.bind(controller)));

module.exports = router;
