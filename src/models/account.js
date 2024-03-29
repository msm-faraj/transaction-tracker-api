"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        onDelete: "cascade",
      });
      Account.hasMany(models.Transaction, {
        as: "transactions",
        foreignKey: "accountId",
      });
    }
  }
  Account.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        // unique: true,
      },
      userId: DataTypes.UUID,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
