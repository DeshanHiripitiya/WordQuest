const express = require('express');
const router = express.Router(); 
const { check, validationResult } = require('express-validator');

const Word = require('../../models/Word');


router.post('/',
    [
  check('word', 'Name is required').notEmpty(),
  check('meaning', 'meaning is required').notEmpty(),
],//validation
 async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { word, meaning, mastered } = req.body;

    try {
      let word1 = await Word.findOne({ word });

      if (word1) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'word already exists' }] });
      }

      newWord = new Word({
        word,
        meaning,
        mastered,
      });

      await newWord.save(); 

       res.send('word added to dictionory');

      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
    //---------------------------------------test if post ok
    //        res.send('User registered');
  }
)

module.exports = router;