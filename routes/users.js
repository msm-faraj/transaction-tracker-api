const express = require("express");
const router = express.Router();
const Users = require("../fake-data/Users");
const userValidator = require("../modules/user-validator");
const Controller = require("../contoroller/user/user");
const controller = new Controller(Users, userValidator);
const reqHandler = require("../middleware/req-handel");

router.get("/", reqHandler(controller.getUsers.bind(controller)));
router.get("/:id", reqHandler(controller.getUser.bind(controller)));
router.post("/", reqHandler(controller.createUser.bind(controller)));
router.put("/:id", reqHandler(controller.updateUser.bind(controller)));
router.delete("/:id", reqHandler(controller.deleteUser.bind(controller)));

module.exports = router;
