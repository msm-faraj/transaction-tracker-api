const express = require("express");
const router = express.Router();
const Categories = require("../fake-data/Categories");
const categoryValidator = require("../modules/category-validator");
const Controller = require("../contoroller/category/category");
const controller = new Controller(Categories, categoryValidator);
const reqHandler = require("../middleware/req-handel");

router.get("/", reqHandler(controller.getCategories.bind(controller)));
router.get("/:id", reqHandler(controller.getCategory.bind(controller)));
router.post("/", reqHandler(controller.createCategory.bind(controller)));
router.put("/:id", reqHandler(controller.updateCategory.bind(controller)));
router.delete("/:id", reqHandler(controller.deleteCategory.bind(controller)));

module.exports = router;
