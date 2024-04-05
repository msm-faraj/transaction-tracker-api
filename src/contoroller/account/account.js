const _ = require("lodash");

class AccountController {
  constructor(Account, validator, User) {
    this.Account = Account;
    this.validator = validator;
    this.User = User;
  }

  //** OK **//
  async create(req, res) {
    //Validte received data to create a new account
    const { error } = this.validator(req.body);
    if (error) return res.status(400).send(error.message);
    //Find the authorized user
    const user = await this.User.findOne({ where: { id: req.user.id } });
    //Prevent duplication in account table for a account
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

  //** OK **//
  async update(req, res) {
    //Validte received data to update the account
    const { error } = this.validator(req.body);
    if (error) return res.status(400).send(error.message);
    //Look up for the account by given id
    const account = await this.Account.findOne({
      where: { id: req.params.id },
    });
    account.name = req.body.name;
    await account.save();
    return res.send(_.pick(account, ["name"]));
  }

  //** OK **//
  async delete(req, res) {
    //Look up for the account by given id
    const account = await this.Account.findOne({
      where: { id: req.params.id },
    });
    account.deletedAt = new Date();
    account.name = "deleted_" + account.name;
    await account.save();
    return res.send("Deleted");
  }

  //** OK **//
  async getAll(req, res) {
    //Find the authorized user
    const user = await this.User.findOne({ where: { id: req.user.id } });
    const allAccounts = await this.Account.findAll({
      where: { userId: user.id, deletedAt: null },
    });
    return res.status(200).send(allAccounts);
  }
}

module.exports = AccountController;
