const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const UserTable = require("../models").User;
const userValidator = require("../modules/user-validator");
const Controller = require("../contoroller/user/user");
const controller = new Controller(UserTable, userValidator);
const reqHandler = require("../middleware/req-handel");

router.post("/", reqHandler(controller.create.bind(controller)));
router.put("/:id", auth, reqHandler(controller.update.bind(controller)));
router.delete("/:id", auth, reqHandler(controller.delete.bind(controller)));
router.get("/me", auth, reqHandler(controller.getOne.bind(controller)));

module.exports = router;
