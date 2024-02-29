const _ = require("lodash");
const { where } = require("sequelize");
class UserController {
  constructor(Users, validator) {
    this.User = Users;
    this.validateUser = validator;
  }
  //ok
  async createUser(req, res) {
    //Validte received data to create a new user
    const { error } = this.validateUser(req.body);
    if (error) return res.status(400).send(error.message);
    ///Check user existance
    const oldUser = await this.User.findOne({
      where: { email: req.body.email },
    });
    if (oldUser) return res.status(400).send("User already registered.");
    //Create a new user with given data
    const { username, password, email } = req.body;
    const newUser = await this.User.create({
      username: username,
      password: password,
      email: email,
    });
    res.send(_.pick(newUser, ["username", "email"]));
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
    const newUser = await this.User.create({});
  } //!!!

  //
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

  //
  async getUser(req, res) {
    //Look up for the user by given id
    const user = this.User.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    res.send(user);
  } //???

  //ok
  async getUsers(req, res) {
    const allUsers = await this.User.findAll({});
    res.send(allUsers);
  } //???
}

module.exports = UserController;
