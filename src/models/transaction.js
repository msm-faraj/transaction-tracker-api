const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        onDelete: "cascade",
      });
      Transaction.belongsTo(models.Account, {
        as: "account",
        foreignKey: "accountId",
        onDelete: "cascade",
      });
      Transaction.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId",
        onDelete: "cascade",
      });
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(["income", "expense"]),
      },
      userId: DataTypes.UUID,
      accountId: DataTypes.UUID,
      categoryId: DataTypes.UUID,
      amount: DataTypes.FLOAT,
      note: DataTypes.STRING,
      description: DataTypes.STRING,
      date: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
