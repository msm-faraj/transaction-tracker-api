class AccountController {
  constructor(Account, validator) {
    this.Account = Account;
    this.validater = validator;
  }

  async createAccount(req, res) {
    //Validte received data to create a new user
    const { error } = this.validater(req.body);
    if (error) return res.status(400).send(error.message);
    //Create a new user with given data
    const user = {
      id: this.Account.length + 1,
      name: req.body.name,
    };
    this.Account.push(user);
    res.send(user);
  }

  async updateAccount(req, res) {
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

  async deleteAccount(req, res) {
    //Look up for the user by given id
    const user = this.Account.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    //Delete a user
    const index = this.Account.indexOf(user);
    this.Account.splice(index, 1);
    //Send deleted user to client
    res.send(user);
  }

  async getAccount(req, res) {
    //Look up for the user by given id
    const user = this.Account.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    res.send(user);
  } //???

  async getAccounts(req, res) {
    res.send(this.Account);
  }
}

module.exports = AccountController;
