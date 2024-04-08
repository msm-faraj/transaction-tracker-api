const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const AccountTable = require("../models").Account;
const UserTable = require("../models").User;
const accountValidator = require("../modules/account-validator");
const Controller = require("../contoroller/account/account");
const controller = new Controller(AccountTable, accountValidator, UserTable);
const reqHandler = require("../middleware/req-handel");

router.post("/", reqHandler(controller.create.bind(controller)));
router.patch("/:id", reqHandler(controller.update.bind(controller)));
router.delete("/:id", reqHandler(controller.delete.bind(controller)));
router.get("/", reqHandler(controller.getAll.bind(controller)));

module.exports = router;
