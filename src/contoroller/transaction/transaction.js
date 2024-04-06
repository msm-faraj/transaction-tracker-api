const _ = require("lodash");

class TransactionController {
  constructor(Transactions, validator, User, Account, Category) {
    this.Transaction = Transactions;
    this.validateTransaction = validator;
    this.User = User;
    this.Account = Account;
    this.Category = Category;
  }

  async create(req, res) {
    //Validte received data to create a new transaction
    const { error } = this.validateTransaction(req.body);
    if (error) return res.status(400).send(error.message);
    const { type, account, category, amount, note, description, date } =
      req.body;
    //Find the used account for transaction
    const usedAccount = await this.Account.findOne({
      where: {
        userId: req.user.id,
        name: account,
      },
    });
    if (!usedAccount) {
      return res.status(404).send("account not founded");
    }
    //Find the used category for transaction
    const usedCategory = await this.Category.findOne({
      where: { name: category },
    });
    if (!usedCategory) {
      return res.status(404).send("category not founded");
    }
    //Create a new transaction with given data
    const transaction = await this.Transaction.create({
      accountId: usedAccount.id,
      categoryId: usedCategory.id,
      type: type,
      note: note,
      date: date,
      amount: amount,
      userId: user.id,
      description: description,
    });
    return res.status(200).send(transaction);
  }

  //** OK **//
  async update(req, res) {
    //Validte received data to create a new transaction
    const { error } = this.validateTransaction(req.body);
    if (error) return res.status(400).send(error.message);
    const { type, account, category, amount, note, description, date } =
      req.body;
    //Find the used account for transaction
    const usedAccount = await this.Account.findOne({
      where: {
        userId: req.user.id,
        name: account,
      },
    });
    if (!usedAccount) {
      return res.send("account not founded");
    }
    //Find the used category for transaction
    const usedCategory = await this.Category.findOne({
      where: { name: category },
    });
    if (!usedCategory) {
      return res.send("category not founded...");
    }
    //Look up for the transaction by given id
    const transaction = await this.Transaction.findOne({
      where: { id: req.params.id },
    });
    transaction.type = type;
    transaction.note = note;
    transaction.amount = amount;
    transaction.accountId = usedAccount.id;
    transaction.categoryId = usedCategory.id;
    transaction.description = description;
    transaction.date = date;
    await transaction.save();
    return res.send(
      _.pick(transaction, [
        "type",
        "date",
        "note",
        "amount",
        "userId",
        "accountId",
        "categoryId",
        "description",
      ])
    );
  }

  //** OK **//
  async delete(req, res) {
    //Look up for the transaction by given id
    const transaction = await this.Transaction.findOne({
      where: { id: req.params.id },
    });
    transaction.deletedAt = new Date();
    transaction.name = "deleted_" + transaction.name;
    await transaction.save();
    return res.send("Deleted");
  }

  //** OK **//
  async getAll(req, res) {
    const allTransactions = await this.Transaction.findAll({
      where: { userId: req.user.id, deletedAt: null },
    });
    return res.status(200).send(allTransactions);
  }
}

module.exports = TransactionController;
