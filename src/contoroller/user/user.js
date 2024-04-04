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
    //Validting data received in body of request
    const { error } = this.validateUser(req.body);
    if (error) return res.status(400).send(error.message);
    //De-structuring req.body
    let { username, password, email } = req.body;
    //Checking user existance with email
    let user = await this.User.findOne({
      where: { email },
    });
    if (user) return res.status(409).send("User already registered.");
    //hashing the password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    //Save new user to the DB
    user = await this.User.create({
      username: username,
      password: password,
      email: email,
    });
    //Generatting token
    const token = user.generateAuthToken();
    user.token = token;
    await user.save();
    //Response to client
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["id", "username", "email"]));
  }

  //ok
  async update(req, res) {
    //Find the authorized user
    const user = await this.User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).send("user not founded");
    }
    //Validate received data to update a user
    const { error } = this.validateUser(req.body);
    if (error) return res.status(400).send(error.message);
    //Update user with sent data
    let { email, username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();
    res.send(_.pick(user, ["id", "username", "email"]));
  }

  //ok
  async delete(req, res) {
    //Find the authorized user
    const user = await this.User.findOne({ where: { id: req.user.id } });
    if (!user || user.deletedAt !== null) {
      return res.status(204);
    }
    // if (user.deletedAt !== null) return res.send("Deleted");
    //Delete a user
    user.deletedAt = new Date();
    user.email = "deleted_" + user.email;
    await user.save();
    //Send deleted user to client
    return res.send("Deleted");
  } //!!!

  //ok
  async getOne(req, res) {
    //find the user by given token to the Headers
    const user = await this.User.findOne({ where: { id: req.user.id } });
    //Checking for deletation of the user
    if (user.deletedAt !== null)
      return res.status(404).send("user not founded");
    //send the username and email of the authorised user
    res.send(_.pick(user, ["username", "email"]));
  }
}

module.exports = UserController;
