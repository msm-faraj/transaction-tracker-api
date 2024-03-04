const express = require("express");
const router = express.Router();
// const Users = require("../fake-data/Users");
const UserTable = require("../DB/models").User;
const authValidator = require("../modules/auth-validator");
const Controller = require("../contoroller/auth/auth");
const controller = new Controller(UserTable, authValidator);
const reqHandler = require("../middleware/req-handel");

// router.get("/", reqHandler(controller.getUsers.bind(controller)));
// router.get("/:id", reqHandler(controller.getUser.bind(controller)));
router.post("/", reqHandler(controller.authUser.bind(controller)));
// router.put("/:id", reqHandler(controller.updateUser.bind(controller)));
// router.delete("/:id", reqHandler(controller.deleteUser.bind(controller)));

module.exports = router;
