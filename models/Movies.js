const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt');



module.exports = (sequelize) => {
  sequelize.define(
    'movie',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          picture: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          title: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
          },
          creationdate: {
            type: DataTypes.DATE,
          },
          rating: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        },
    {
      timestamps: false,
    }
      
     
    
  );
};