class TransactionController {
  constructor(Transaction, validator) {
    this.Transaction = Transaction;
    this.validator = validator;
  }

  async createTransaction(req, res) {}

  async updateTransaction(req, res) {}

  async deleteTransaction(req, res) {}

  async getTransaction(req, res) {} //???

  async getTransactions(req, res) {}
}

module.exports = TransactionController;
