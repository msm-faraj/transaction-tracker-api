const config = require("config");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserController {
  constructor(Users, validator) {
    this.User = Users;
    this.validateUser = validator;
  }
  //ok
  async create(req, res) {
    //Validte received data to create a new user
    const { error } = this.validateUser(req.body);
    if (error) return res.status(400).send(error.message);
    //Check user existance
    const oldUser = await this.User.findOne({
      where: { email: req.body.email },
    });
    if (oldUser) return res.status(400).send("User already registered.");
    //Destructure req.body
    let { username, password, email } = req.body;
    //hassh the password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    //Save user to the DB
    const user = await this.User.create({
      username: username,
      password: password,
      email: email,
    });
    const token = user.generateAuthToken();

    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["id", "username", "email"]));
  }

  //ok
  async update(req, res) {
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
  async delete(req, res) {
    //Look up for the user by given id
    const user = this.User.findOne({ where: { id: req.user.id } });
    if (!user) return res.status(404).send("The user was not found");
    //Delete a user

    //Send deleted user to client
    res.send(user);
  } //!!!

  //ok
  async getOne(req, res) {
    const user = await this.User.findOne({ id: req.user.id });
    res.send(user);
  }
}

module.exports = UserController;
