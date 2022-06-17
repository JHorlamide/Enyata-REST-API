const { DataTypes, Model } = require("sequelize");
const sequelize = require('../config/index');

class Users extends Model {};

Users.init({
  name: DataTypes.STRING,

  email: {
    type: DataTypes.STRING,
    unique: true,
  },

  password: DataTypes.STRING,
}, { sequelize });

module.exports = Users;
