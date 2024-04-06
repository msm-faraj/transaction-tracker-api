const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const CategoryTable = require("../models").Category;
const UserTable = require("../models").User;
const categoryValidator = require("../modules/category-validator");
const Controller = require("../contoroller/category/category");
const controller = new Controller(CategoryTable, categoryValidator, UserTable);
const reqHandler = require("../middleware/req-handel");

router.post("/", reqHandler(controller.create.bind(controller)));
router.patch("/:id", reqHandler(controller.update.bind(controller)));
router.delete("/:id", reqHandler(controller.delete.bind(controller)));
router.get("/", reqHandler(controller.getAll.bind(controller)));

module.exports = router;
