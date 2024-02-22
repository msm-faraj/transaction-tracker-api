class AccountController {
  constructor(Account, validator) {
    this.Account = Account;
    this.validator = validator;
  }

  async createAccount(req, res) {}

  async updateAccount(req, res) {}

  async deleteAccount(req, res) {}

  async getAccount(req, res) {} //???

  async getAccounts(req, res) {}
}

module.exports = AccountController;
