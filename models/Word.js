const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  meaning: {
    type: String,
    required: true,
  },mastered: {
    type: Boolean,
    required: true,
  },weight: {
    type: Number,
    required: true,
  }
})

module.exports = WordSchema;