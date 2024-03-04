class CategoryController {
  constructor(Category, validator) {
    this.Category = Category;
    this.validateCategory = validator;
  }

  async create(req, res) {
    //Validte received data to create a new user
    const { error } = this.validateCategory(req.body);
    if (error) return res.status(400).send(error.message);
    //Create a new user with given data
    const category = await this.Category.create({
      name: req.body.name,
    });
    res.status(200).send(category);
  }

  async update(req, res) {
    //Look up for the user by given id
    const user = this.Category.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    //Validate received data to update a user
    const { error } = this.validateCategory(req.body);
    if (error) return res.status(400).send(error.message);
    //Update user with sent data
    user.name = req.body.name;
    res.send(user);
  }

  async delete(req, res) {
    //Look up for the user by given id
    const user = this.Category.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    //Delete a user
    const index = this.Category.indexOf(user);
    this.Category.splice(index, 1);
    //Send deleted user to client
    res.send(user);
  }

  async getOne(req, res) {
    const category = await this.Category.findOne({
      where: { id: req.params.id },
    });
    if (!category) return res.status(404).send("The category was not found");
    res.send(category);
  }

  async getAll(req, res) {
    const allCategories = await this.Category.findAll({});
    return res.status(200).send(allCategories);
  }
}

module.exports = CategoryController;
