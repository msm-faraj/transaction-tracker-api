const express = require("express");
const router = express.Router();
const UserTable = require("../models").User;
const authValidator = require("../modules/auth-validator");
const Controller = require("../contoroller/auth/auth");
const controller = new Controller(UserTable, authValidator);
const reqHandler = require("../middleware/req-handel");

router.post("/", reqHandler(controller.authUser.bind(controller)));

module.exports = router;
