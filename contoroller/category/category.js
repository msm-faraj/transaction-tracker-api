class CategoryController {
  constructor(Category, validator) {
    this.Category = Category;
    this.validateCategory = validator;
  }

  async createCategory(req, res) {
    //Validte received data to create a new user
    const { error } = this.validateCategory(req.body);
    if (error) return res.status(400).send(error.message);
    //Create a new user with given data
    const user = {
      id: this.Category.length + 1,
      name: req.body.name,
    };
    this.Category.push(user);
    res.send(user);
  }

  async updateCategory(req, res) {
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

  async deleteCategory(req, res) {
    //Look up for the user by given id
    const user = this.Category.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    //Delete a user
    const index = this.Category.indexOf(user);
    this.Category.splice(index, 1);
    //Send deleted user to client
    res.send(user);
  }

  async getCategory(req, res) {
    //Look up for the user by given id
    const user = this.Category.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    res.send(user);
  } //???

  async getCategories(req, res) {
    res.send(this.Category);
  }
}

module.exports = CategoryController;
