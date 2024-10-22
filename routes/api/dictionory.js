const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const {get_all_words_from_dic, edit_word_from_dic, delete_word_from_dic } = require('../../controller/dictionory')

// GET all words
router.get('/', get_all_words_from_dic);

// PUT - Update word
router.put(
  '/:id', // Added :id to specify which word to update
  [
    check('word', 'Word is required').notEmpty(),
    check('meaning', 'Meaning is required').notEmpty(),
  ], // Validation
  edit_word_from_dic
);

// DELETE a word by ID
router.delete('/:id', delete_word_from_dic);

module.exports = router;
