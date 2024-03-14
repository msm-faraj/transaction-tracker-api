class CategoryController {
  constructor(Category, validator, User) {
    this.Category = Category;
    this.validateCategory = validator;
    this.User = User;
  }

  async create(req, res) {
    //Validte received data to create a new user
    const { error } = this.validateCategory(req.body);
    if (error) return res.status(400).send(error.message);
    //Find the authorized user
    const user = await this.User.findOne({ where: { id: req.user.id } });
    //Create a new user with given data
    const category = await this.Category.create({
      name: req.body.name,
      type: req.body.type,
      userId: user.id,
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

  //** OK **//
  async getSome(req, res) {
    const user = await this.User.findOne({ where: { id: req.user.id } });
    const someCategories = await this.Category.findAll({
      where: { type: req.params.type },
    });
    if (!someCategories)
      return res.status(404).send("The categories was not found");
    return res.status(200).send(someCategories);
  }

  //** OK **//
  async getAll(req, res) {
    //Find the authorized user
    const user = await this.User.findOne({ where: { id: req.user.id } });
    const allCategories = await this.Category.findAll({
      where: { userId: user.id, type: req.query.type },
    });
    console.log(req.params);
    return res.status(200).send(allCategories);
  }
}

module.exports = CategoryController;
