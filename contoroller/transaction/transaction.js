class TransactionController {
  constructor(Transaction, validator) {
    this.Transaction = Transaction;
    this.validateTransaction = validator;
  }

  async createTransaction(req, res) {
    //Validte received data to create a new user
    const { error } = this.validateTransaction(req.body);
    if (error) return res.status(400).send(error.message);
    //Create a new user with given data
    const user = {
      id: this.Transaction.length + 1,
      amount: req.body.amount,
    };
    this.Transaction.push(user);
    res.send(user);
  }

  async updateTransaction(req, res) {
    //Look up for the user by given id
    const user = this.Transaction.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    //Validate received data to update a user
    const { error } = this.validateTransaction(req.body);
    if (error) return res.status(400).send(error.message);
    //Update user with sent data
    user.amount = req.body.amount;
    res.send(user);
  }

  async deleteTransaction(req, res) {
    //Look up for the user by given id
    const user = this.Transaction.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    //Delete a user
    const index = this.Transaction.indexOf(user);
    this.Transaction.splice(index, 1);
    //Send deleted user to client
    res.send(user);
  }

  async getTransaction(req, res) {
    //Look up for the user by given id
    const user = this.Transaction.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user was not found");
    res.send(user);
  } //???

  async getTransactions(req, res) {
    res.send(this.Transaction);
  }
}

module.exports = TransactionController;
