class UserController {
  constructor(Users, validator) {
    this.User = Users;
    this.validateUser = validator;
  }

  async createUser(req, res) {
    //Validte received data to create a new user
    const { error } = this.validateUser(req.body);
    if (error) return res.status(400).send(error.message);
    //Create a new user with given data
    const { username, password, email } = req.body;
    const newUser = await this.User.create({
      username: username,
      password: password,
      email: email,
    });
    return res.json({
      status: 200,
      newUser,
    });
  }

  //ok
  async updateUser(req, res) {
    //Look up for the user by given id
    const user = this.User.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    //Validate received data to update a user
    const { error } = this.validateUser(req.body);
    if (error) return res.status(400).send(error.message);
    //Update user with sent data
    user.name = req.body.name;
    res.send(user);
  } //!!!

  //ok
  async deleteUser(req, res) {
    //Look up for the user by given id
    const user = this.User.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    //Delete a user
    const index = this.User.indexOf(user);
    this.User.splice(index, 1);
    //Send deleted user to client
    res.send(user);
  } //!!!

  //ok
  async getUser(req, res) {
    //Look up for the user by given id
    const user = this.User.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    res.send(user);
  } //???

  //ok
  async getUsers(req, res) {
    res.send(this.User);
  } //???
}

module.exports = UserController;
