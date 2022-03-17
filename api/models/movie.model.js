const { DataTypes } = require('sequelize');
// Utils
const { sequelize } = require('../util/database');

const Movie = sequelize.define('movie', {
   id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
   },
   title: {
      type: DataTypes.STRING(80),
      allowNull: false // NOT NULL
   },
   description: {
      type: DataTypes.STRING(225),
      allowNull: false
   },
   duration: {
      type: DataTypes.STRING(15),
      allowNull: false
   },
   rating: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   img: {
      type: DataTypes.STRING(20),
      allowNull: false
   },
   genre: {
      type: DataTypes.STRING(30),
      allowNull: false
   },
   status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'active'
   }
});

module.exports = { Movie };
