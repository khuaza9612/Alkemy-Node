const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt');



module.exports = (sequelize) => {
  sequelize.define(
    'genere',
    {
      id: {
        
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      picture: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
    },
    {
      timestamps: false,
    }
      
     
    
  );
};