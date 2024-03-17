class AccountController {
  constructor(Account, validator, User) {
    this.Account = Account;
    this.validater = validator;
    this.User = User;
  }

  //** OK **//
  async create(req, res) {
    //Validte received data to create a new user
    const { error } = this.validater(req.body);
    if (error) return res.status(400).send(error.message);
    //Find the authorized user
    const user = await this.User.findOne({ where: { id: req.user.id } });
    //Prevent duplication in account table for a user
    const existingAccount = await this.Account.findOne({
      where: {
        userId: user.id,
        name: req.body.name,
      },
    });
    if (existingAccount) {
      return res.send("this account has been defined");
    }
    //Create a new user with given data
    const account = await this.Account.create({
      name: req.body.name,
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

  //** OK **//
  async delete(req, res) {
    //Look up for the user by given id
    const deletedAccount = await this.Account.destroy({
      where: { id: req.params.id },
    });

    return res.send("deleted");
  }

  //** OK **//
  async getAll(req, res) {
    //Find the authorized user
    const user = await this.User.findOne({ where: { id: req.user.id } });
    const allAccounts = await this.Account.findAll({
      where: { userId: user.id },
    });
    return res.status(200).send(allAccounts);
  }
}

module.exports = AccountController;
