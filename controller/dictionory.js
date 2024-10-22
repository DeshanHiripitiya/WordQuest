const { Dictionary } = require('../models/Models');

exports.get_all_words_from_dic = async (req, res) => {
  try {
    const words = await Dictionary.findAll();
    res.json(words);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.edit_word_from_dic = async (req, res) => {
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
      { where: { id } } // Sequelize syntax for updating
    );

    if (updatedWord[0] === 0) {
      return res.status(404).json({ message: 'Word not found' });
    }

    res.json({ message: 'Word updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error updating word' });
  }
};

exports.delete_word_from_dic = async (req, res) => {
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
};
