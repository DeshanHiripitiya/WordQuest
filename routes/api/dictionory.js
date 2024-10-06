const express = require('express');
const router = express.Router();

const { Dictionary } = require('../../models/Models');
const { check, validationResult } = require('express-validator');

// GET all words
router.get('/', async (req, res) => {
  try {
    const words = await Dictionary.findAll();
    res.json(words);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// PUT - Update word
router.put(
  '/:id', // Added :id to specify which word to update
  [
    check('word', 'Word is required').notEmpty(),
    check('meaning', 'Meaning is required').notEmpty(),
  ], // Validation
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { word, meaning } = req.body;
      const id = req.params.id;

      // Find the word by ID and update it
      const updatedWord = await Dictionary.update(
        { word, meaning }, // Fields to update
        { where: { id }, returning: true } // Sequelize syntax for updating
      );

      if (updatedWord[0] === 0) {
        return res.status(404).json({ message: 'Word not found' });
      }

      res.json({ message: 'Word updated successfully', updatedWord });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Error updating word' });
    }
  }
);

// DELETE a word by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Delete the word by ID
    const deletedWord = await Dictionary.destroy({ where: { id } });

    if (deletedWord === 0) {
      return res.status(404).json({ message: 'Word not found' });
    }

    res.json({ message: 'Word deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
