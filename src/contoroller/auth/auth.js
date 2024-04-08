const bcrypt = require("bcrypt");
const _ = require("lodash");

class AuthController {
  constructor(Users, authValidator, userValidator) {
    this.User = Users;
    this.validateAuth = authValidator;
    this.validateUser = userValidator;
  }

  async register(req, res) {
    //Validting data received in body of request
    const { error } = this.validateUser(req.body);
    if (error) return res.status(400).send(error.message);
    //De-structuring req.body
    let { username, password, email } = req.body;
    //Checking user existance with email
    let user = await this.User.findOne({
      where: { email },
    });
    if (user)
      return res
        .status(409)
        .send("User has already registered with this email address.");
    //hashing the password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    //Save new user to the DB
    user = await this.User.create({
      username,
      password,
      email,
    });
    //Generatting token
    const token = user.generateAuthToken();
    user.token = token;
    await user.save();
    //Response to client
    return res
      .header("x-auth-token", token)
      .send(_.pick(user, ["id", "username", "email"]));
  }

  async login(req, res) {
    //Validte received data to create a new user
    const { error } = this.validateAuth(req.body);
    if (error) return res.status(400).send(error.message);
    //Destructure req.body
    let { password, email } = req.body;
    //Validate email
    let user = await this.User.findOne({
      where: { email },
    });
    if (!user) return res.status(400).send("Invalid email or password.");
    //Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");
    //Generate token and save to database
    const token = user.generateAuthToken();
    user.token = token;
    await user.save();

    res.json({ accessToken: token });
  }
}

module.exports = AuthController;
