const { Model, DataTypes } = require('sequelize');
const bycrytp = require('bycrypt');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len:[8],
        }
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  
  module.exports = User;
  