const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const dictionaryController = require('../../controller/word');

router.post(
  '/',
  [
    check('word', 'Word is required').notEmpty(),
    check('meaning', 'Meaning is required').notEmpty(),
  ],
  dictionaryController.addWord
);

module.exports = router;
