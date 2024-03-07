class AccountController {
  constructor(Account, validator, User) {
    this.Account = Account;
    this.validater = validator;
    this.User = User;
  }

  async create(req, res) {
    //Validte received data to create a new user
    const { error } = this.validater(req.body);
    if (error) return res.status(400).send(error.message);
    //Find the authorized user
    const user = await this.User.findOne({ where: { id: req.user.id } });
    //Create a new user with given data
    const account = await this.Account.create({
      name: req.body.name,
      typeId: req.body.typeId,
      userId: user.id,
    });

    res.status(200).send(account);
  }

  async update(req, res) {
    //Look up for the user by given id
    const user = this.Account.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    //Validate received data to update a user
    const { error } = this.validater(req.body);
    if (error) return res.status(400).send(error.message);
    //Update user with sent data
    user.name = req.body.name;
    res.send(user);
  }

  async delete(req, res) {
    //Look up for the user by given id
    const user = this.Account.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    //Delete a user
    const index = this.Account.indexOf(user);
    this.Account.splice(index, 1);
    //Send deleted user to client
    res.send(user);
  }

  async getOne(req, res) {
    //Look up for the user by given id
    const account = await this.Account.findOne({
      where: { id: req.params.id },
    });
    if (!account) return res.status(404).send("The account was not found");
    res.send(account);
  }

  async getAll(req, res) {
    const allAccounts = await this.Account.findAll({});
    return res.status(200).send(allAccounts);
  }
}

module.exports = AccountController;
