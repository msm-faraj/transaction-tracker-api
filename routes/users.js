const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
// const Users = require("../fake-data/Users");
const UserTable = require("../DB/models").User;
const userValidator = require("../modules/user-validator");
const Controller = require("../contoroller/user/user");
const controller = new Controller(UserTable, userValidator);
const reqHandler = require("../middleware/req-handel");

router.post("/", reqHandler(controller.create.bind(controller)));
router.get("/me", auth, reqHandler(controller.getOne.bind(controller)));
// router.get("/", reqHandler(controller.getAll.bind(controller)));
// router.put("/:id", reqHandler(controller.update.bind(controller)));
// router.delete("/:id", reqHandler(controller.delete.bind(controller)));

module.exports = router;
