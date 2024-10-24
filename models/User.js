const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const User = sequelize.define(
  'User',
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure phone number is unique
      validate: {
        isNumeric: true, // Ensures phone number contains only digits
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
      validate: {
        isEmail: true, // Email format validation
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users', // Optional: Set the table name explicitly
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = User;
