const { DataTypes } = require('sequelize');
// Utils
const { sequelize } = require('../util/database');

const User = sequelize.define('user', {
   id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
   },
   userName: {
      type: DataTypes.STRING(60),
      allowNull: false // NOT NULL
   },
   email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
   },
   password: {
      type: DataTypes.STRING(200),
      allowNull: false
   },
   status: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'active'
   },
   role: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'normal'
   }
});

module.exports = {User}