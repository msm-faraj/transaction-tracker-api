const _ = require("lodash");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
class UserController {
  constructor(Users, validator) {
    this.User = Users;
    this.validateUser = validator;
  }
  //ok
  async authUser(req, res) {
    //Validte received data to create a new user
    const { error } = this.validateUser(req.body);
    if (error) return res.status(400).send(error.message);
    //Check user existance
    const oldUser = await this.User.findOne({
      where: { email: req.body.email },
    });
    if (!oldUser) return res.status(400).send("Invalid email or password.");

    //Validate password
    let { username, password, email } = req.body;
    const validPassword = await bcrypt.compare(username, oldUser.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    res.send(true);
  }
}

module.exports = UserController;
