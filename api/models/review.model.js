const { DataTypes } = require('sequelize');
// Utils
const { sequelize } = require('../util/database');

const Review = sequelize.define('review', {
   id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
   },
   title: {
      type: DataTypes.STRING(40),
      allowNull: false // NOT NULL
   },
   comment: {
      type: DataTypes.STRING(225),
      allowNull: false
   },
   rating: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   status: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'active'
   },
   userId: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
   }
});

module.exports = { Review };
