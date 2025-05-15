"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notes.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Notes.init(
    {
      note: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isprivate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: "Notes",
      tableName: "Notes",
    }
  );
  return Notes;
};
