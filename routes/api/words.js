const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Dictionary, MasteredWords } = require('../../models/Models');

router.post(
  
  '/',
  [
    check('word', 'Word is required').notEmpty(),
    check('meaning', 'Meaning is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { word, meaning, mastered, weight } = req.body;
    weight = 0;

    try {
      // Check if the word already exists in Dictionary
      let existingWord = await Dictionary.findOne({
        where: { word },
      });

      if (existingWord) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Word already exists' }] });
      }

      // Check if the word exists in MasteredWords
      let masteredWord = await MasteredWords.findOne({
        where: { word },
      });

      if (masteredWord) {
        mastered = false;
      }

      // Create a new entry in the Dictionary
      const newWord = await Dictionary.create({
        word,
        meaning,
        mastered: false,
        weight,
      });

      res.json({ msg: 'Word added to dictionary', newWord });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
