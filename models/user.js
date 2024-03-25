const jwt = require("jsonwebtoken");
// const config = require("config");
const config = require("dotenv").config();

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Transaction, {
        as: "transactions",
        foreignKey: "userId",
      });
      User.hasMany(models.Account, {
        as: "accounts",
        foreignKey: "userId",
      });
      User.hasMany(models.Category, {
        as: "categories",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.prototype.generateAuthToken = function () {
    const token = jwt.sign(
      { id: this.id },
      process.env.transaction_tracker_jwtPrivateKey
    );
    return token;
  };
  return User;
};
