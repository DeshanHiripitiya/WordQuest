const express = require('express');
const router = express.Router(); 
const { check, validationResult } = require('express-validator');

const {Dictionary,MasteredWords} = require('../../models/Models');


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
    let { word, meaning, mastered,weight } = req.body;
    weight=0
    
    try {
      let word1 = await Dictionary.findOne({ word });

      if (word1) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'word already exists' }] });
      }

      const masteredWord = await MasteredWords.findOne({ word });

      if (masteredWord) {
        mastered = false; // Ensure mastered is set to false
      }

      newWord = new Dictionary({
        word,
        meaning,
        mastered:false,
        weight,
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