const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const UserTable = require("../models").User;
const userValidator = require("../modules/user-validator");
const editUserValidator = require("../modules/user-edit-validator");
const Controller = require("../contoroller/user/user");
const controller = new Controller(UserTable, editUserValidator);
const reqHandler = require("../middleware/req-handler");

router.patch("/me", auth, reqHandler(controller.update.bind(controller)));
router.delete("/me", auth, reqHandler(controller.delete.bind(controller)));
router.get("/me", auth, reqHandler(controller.getOne.bind(controller)));

module.exports = router;
