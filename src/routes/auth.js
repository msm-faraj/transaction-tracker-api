const express = require("express");
const router = express.Router();
const UserTable = require("../models").User;
const authValidator = require("../modules/auth-validator");
const userValidator = require("../modules/user-validator");
const Controller = require("../contoroller/auth/auth");
const controller = new Controller(UserTable, authValidator, userValidator);
const reqHandler = require("../middleware/req-handel");

router.post("/login", reqHandler(controller.login.bind(controller)));
router.post("/register", reqHandler(controller.register.bind(controller)));

module.exports = router;
