const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Define the shared model schema
const WordSchema = {
  word: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  meaning: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mastered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
};

// Create two separate models with the same schema but different table names
const Dictionary = sequelize.define('Dictionary', WordSchema, {
  tableName: 'dictionary',
  timestamps: false,
});

const MasteredWords = sequelize.define('MasteredWords', WordSchema, {
  tableName: 'masteredWords',
  timestamps: false,
});

// Export the models
module.exports = {
  Dictionary,
  MasteredWords,
};
