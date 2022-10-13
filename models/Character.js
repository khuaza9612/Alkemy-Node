const { DataTypes } = require('sequelize');
const sequelize = require('../db');




module.exports = (sequelize) => {
  sequelize.define(
    'character',
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
          name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
          },
          age: {
              type: DataTypes.INTEGER,
              allowNull: false
      
          },
          weight: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          history: {
              type: DataTypes.TEXT,
              allowNull: false
          }
        },
        {
          timestamps: false,
        }
        
    
  );
};