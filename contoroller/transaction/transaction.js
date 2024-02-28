class TransactionController {
  constructor(Transactions, validator) {
    this.Transaction = Transactions;
    this.validateTransaction = validator;
  }
  //ok
  async createTransaction(req, res) {
    //Validte received data to create a new user
    const { error } = this.validateTransaction(req.body);
    if (error) return res.status(400).send(error.message);
    //Create a new user with given data
    const {
      userId,
      typeId,
      accountId,
      categoryId,
      amount,
      note,
      description,
      date,
    } = req.body;
    const newTransaction = await this.Transaction.create({
      amount: amount,
    });
    return res.json({
      status: 200,
      newTransaction,
    });
  }
  // ok
  async updateTransaction(req, res) {
    //Look up for the user by given id
    const transaction = await this.Transaction.findOne({
      id: `${parseInt(req.params.id)}`,
    });
    if (!transaction) return res.status(404).send("The user was not found");
    //Validate received data to update a user
    const { error } = this.validateTransaction(req.body);
    if (error) return res.status(400).send(error.message);
    //Update user with sent data
    transaction.amount = req.body.amount;
    res.send(transaction);
  }

  async deleteTransaction(req, res) {
    //Look up for the user by given id
    const transaction = this.Transaction.findOne({
      id: `${parseInt(req.params.id)}`,
    });
    if (!transaction) return res.status(404).send("The user was not found");
    //Delete a user
    const deletedTransaction = await this.Transaction.destroy({
      id: `${parseInt(req.params.id)}`,
    });
    //Send deleted user to client
    res.send(deletedTransaction);
  }

  async getTransaction(req, res) {
    //Look up for the user by given id
    const user = this.Transaction.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    res.send(user);
  } //???

  //ok
  async getTransactions(req, res) {
    const allTransactions = await this.Transaction.findAll({});
    return res.json({
      status: 200,
      allTransactions,
    });
  }
}

module.exports = TransactionController;
