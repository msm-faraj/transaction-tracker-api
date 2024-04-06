const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserController {
  constructor(Users, userValidator, editUserValidator) {
    this.User = Users;
    this.validateUser = userValidator;
    this.validateEditUser = editUserValidator;
  }

  //ok
  async update(req, res) {
    //Find the authorized user
    const user = await this.User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).send("user not founded");
    }
    //Validate received data to update a user
    const { error } = this.validateEditUser(req.body);
    if (error) return res.status(400).send(error.message);
    //Update user with sent data
    let { email, username } = req.body;
    user.username = username;
    user.email = email;
    await user.save();
    return res.send(_.pick(user, ["id", "username", "email"]));
  }

  //ok
  async delete(req, res) {
    //Find the authorized user
    const user = await this.User.findOne({ where: { id: req.user.id } });
    if (!user || user.deletedAt !== null) {
      return res.status(204);
    }
    //Delete a user
    user.deletedAt = new Date();
    user.email = "deleted_" + user.email;
    await user.save();
    //Send deleted user to client
    return res.send("Deleted");
  }

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
