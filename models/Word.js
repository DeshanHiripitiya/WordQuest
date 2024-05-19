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
  },
  mastered: {
    type: Boolean,
  },
});

module.exports = mongoose.model('dictionory', WordSchema);
