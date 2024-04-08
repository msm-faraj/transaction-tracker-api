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
        unique: "unique_categories_name_&_type_for_each_user",
      },
      userId: {
        type: DataTypes.UUID,
        unique: "unique_categories_name_&_type_for_each_user",
      },
      type: {
        type: DataTypes.ENUM(["income", "expense"]),
        unique: "unique_categories_name_&_type_for_each_user",
      },
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
