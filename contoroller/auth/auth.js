const bcrypt = require("bcrypt");
class AuthController {
  constructor(Users, validator) {
    this.User = Users;
    this.validateAuth = validator;
  }
  //ok
  async authUser(req, res) {
    //Validte received data to create a new user
    const { error } = this.validateAuth(req.body);
    if (error) return res.status(400).send(error.message);

    //Destructure req.body
    let { username, password, email } = req.body;

    //Validate email
    let user = await this.User.findOne({
      where: { email: email },
    });
    if (!user) return res.status(400).send("Invalid email or password.");

    //Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    const tokenObj = { token: token };

    res.send(tokenObj);
  }
}

module.exports = AuthController;
