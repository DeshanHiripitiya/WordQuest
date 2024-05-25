const mongoose = require('mongoose');
const WordSchema = require('./Word'); // Path to the Word schema file

const Dictionary = mongoose.model('Dictionary', WordSchema, 'dictionory');
const MasteredWords = mongoose.model(
  'MasteredWords',
  WordSchema,
  'masteredWords'
);

module.exports = {
  Dictionary,
  MasteredWords,
};
