"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        onDelete: "cascade",
      });
      Category.hasMany(models.Transaction, {
        as: "transactions",
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(
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
      type: DataTypes.ENUM(["income", "expense"]),
      userId: DataTypes.UUID,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
