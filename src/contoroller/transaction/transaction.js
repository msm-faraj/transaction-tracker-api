const _ = require("lodash");

class TransactionController {
  constructor(User, Account, Category, Transactions, validator) {
    this.User = User;
    this.Account = Account;
    this.Category = Category;
    this.Transaction = Transactions;
    this.validateTransaction = validator;
  }

  async create(req, res, next) {
    // Validate received data to create a new transaction
    const { error } = this.validateTransaction(req.body);
    if (error) return res.status(400).send(error.message);

    const { type, account, category, amount, note, description, date } =
      req.body;

    // Find the used account for the transaction
    const usedAccount = await this.Account.findOne({
      where: {
        userId: req.user.id,
        name: account,
      },
    });

    if (!usedAccount) {
      return res.status(404).send("Account not found.");
    }

    // Find the used category for the transaction
    const usedCategory = await this.Category.findOne({
      where: { name: category },
    });

    if (!usedCategory) {
      return res.status(404).send("Category not found.");
    }

    // Create a new transaction with given data
    const transaction = await this.Transaction.create({
      type,
      note,
      date,
      amount,
      description,
      userId: req.user.id,
      accountId: usedAccount.id,
      categoryId: usedCategory.id,
    });

    return res.status(200).send(transaction);
  }

  async getAll(req, res, next) {
    const allTransactions = await this.Transaction.findAll({
      where: { userId: req.user.id, deletedAt: null },
    });

    return res.status(200).send(allTransactions);
  }

  async update(req, res, next) {
    // Validate received data to update a transaction
    const { error } = this.validateTransaction(req.body);
    if (error) return res.status(400).send(error.message);

    const { type, account, category, amount, note, description, date } =
      req.body;

    // Find the used account for the transaction
    const usedAccount = await this.Account.findOne({
      where: {
        userId: req.user.id,
        name: account,
      },
    });

    if (!usedAccount) {
      return res.status(404).send("Account not found.");
    }

    // Find the used category for the transaction
    const usedCategory = await this.Category.findOne({
      where: { name: category },
    });

    if (!usedCategory) {
      return res.status(404).send("Category not found.");
    }

    // Look up for the transaction by given id
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

    return res
      .status(200)
      .send(
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

  async delete(req, res, next) {
    // Look up for the transaction by given id
    const transaction = await this.Transaction.findOne({
      where: { id: req.params.id },
    });

    if (!transaction) {
      return res.status(404).send("Transaction not found.");
    }

    transaction.deletedAt = new Date();
    transaction.name = "deleted_" + transaction.name;

    await transaction.save();

    return res.status(200).end();
  }
}

module.exports = TransactionController;
