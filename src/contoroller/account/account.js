const _ = require("lodash");

class AccountController {
  constructor(Account, validator, User) {
    this.User = User;
    this.Account = Account;
    this.validateAccount = validator;
  }

  async create(req, res) {
    //Validte received data to create a new account
    const { error } = this.validateAccount(req.body);
    if (error) return res.status(400).send(error.message);
    //Find the authorized user
    const user = await this.User.findOne({ where: { id: req.user.id } });
    //Create a new user with given data
    const account = await this.Account.create({
      name: req.body.name,
      userId: user.id,
    });
    res.status(200).send(_.pick(account, ["name"]));
  }

  async getAll(req, res) {
    const whereClause = { userId: req.user.id, deletedAt: null };
    const allAccounts = await this.Account.findAll({
      where: whereClause,
    });
    return res.status(200).send(allAccounts);
  }

  async update(req, res) {
    //Validte received data to update the account
    const { error } = this.validateAccount(req.body);
    if (error) return res.status(400).send(error.message);
    //Look up for the account by given id
    const account = await this.Account.findOne({
      where: { id: req.params.id },
    });
    if (!account) return res.status(404).send("Account not founded.");
    //Update the account
    account.name = req.body.name;
    await account.save();
    return res.send(_.pick(account, ["name"]));
  }

  async delete(req, res) {
    //Look up for the account by given id
    const account = await this.Account.findOne({
      where: { id: req.params.id },
    });
    account.deletedAt = new Date();
    account.name = "deleted_" + account.name;
    await account.save();
    return res.status(204).end();
  }
}

module.exports = AccountController;
