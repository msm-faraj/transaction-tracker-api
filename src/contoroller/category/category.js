const _ = require("lodash");

class CategoryController {
  constructor(Category, validator, User) {
    this.Category = Category;
    this.validateCategory = validator;
    this.User = User;
  }

  async create(req, res, next) {
    //Validte received data to create a new category
    const { error } = this.validateCategory(req.body);
    if (error) return res.status(400).send(error.message);
    //Create a new category with given data
    try {
      const category = await this.Category.create({
        name: req.body.name,
        type: req.body.type,
        userId: req.user.id,
      });
      res.status(200).send(_.pick(category, ["name", "type"]));
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError")
        return res.status(400).send("This category has already been added.");
      else {
        next(err);
      }
      next(err);
    }
  }

  async getAll(req, res) {
    const whereClause = { userId: req.user.id, deletedAt: null };
    if (req.query.type) {
      whereClause.type = req.query.type;
    }
    const allCategories = await this.Category.findAll({
      where: whereClause,
    });
    return res.status(200).send(allCategories);
  }

  async update(req, res) {
    //Validate received data to update a category
    const { error } = this.validateCategory(req.body);
    if (error) return res.status(400).send(error.message);
    // Look up for the category by given id
    const category = await this.Category.findOne({
      where: { id: req.params.id },
    });
    if (!category) return res.status(404).send("Category not founded.");
    //Update the category
    category.name = req.body.name;
    category.type = req.body.type;
    category.save();
    return res.send(_.pick(category, ["name", "type"]));
  }

  async delete(req, res) {
    //Look up for the category by given id
    const category = await this.Category.findOne({
      where: { id: req.params.id },
    });
    category.deletedAt = new Date();
    category.name = "deleted_" + category.name;
    await category.save();
    return res.send(204).end();
  }
}

module.exports = CategoryController;
