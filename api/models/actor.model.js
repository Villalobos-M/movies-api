const { DataTypes } = require('sequelize');
// Utils
const { sequelize } = require('../util/database');

const Actor = sequelize.define('actors', {
   id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
   },
   name: {
      type: DataTypes.STRING(80),
      allowNull: false
   },
   country: {
      type: DataTypes.STRING(100),
      allowNull: false
   },
   rating: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   age: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   profilePic: {
      type: DataTypes.STRING(225),
      allowNull: false
   },
   status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'active'
   }
});

module.exports = { Actor };
