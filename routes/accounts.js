const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
// const Accounts = require("../fake-data/Accounts");
const AccountTable = require("../DB/models").Account;
const accountValidator = require("../modules/account-validator");
const Controller = require("../contoroller/account/account");
const controller = new Controller(AccountTable, accountValidator);
const reqHandler = require("../middleware/req-handel");

router.post("/", reqHandler(controller.create.bind(controller)));
router.put("/:id", reqHandler(controller.update.bind(controller)));
router.delete("/:id", reqHandler(controller.delete.bind(controller)));
router.get("/:id", reqHandler(controller.getOne.bind(controller)));
router.get("/", reqHandler(controller.getAll.bind(controller)));

module.exports = router;
