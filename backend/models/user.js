'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Notes,{
          foreignKey: 'userId',
          as: 'notes'
      })
    }
  }
  Users.init({
    firstname: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        is: /^[A-Za-z]+$/i,  // ✅ only alphabets, case-insensitive
        len:[2,60],
        notEmpty: true
      }
    },
    lastname: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        is: /^[A-Za-z]+$/i,  // ✅ only alphabets, case-insensitive
        len:[2,60],
        notEmpty:true
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Users',
    tableName: 'Users'
  });
  return Users;
};