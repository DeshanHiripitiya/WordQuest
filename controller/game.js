const { MasteredWords } = require('../models/Models');

exports.get_All_data_from_game = async (req, res) => {
  try {
    const word = await MasteredWords.findAll();
    res.json(word);
  } catch (err) {
    console.error(err);
    res.send(500).json({ msg: 'server error' });
  }
};

exports.create_a_word_to_game = async (req, res) => {
  let { word, meaning, mastered, weight } = req.body;
  mastered = true;
  weight = 0;
  try {
    let word1 = await MasteredWords.findOne({
      where: { word: word },
    });

    if (word1) {
      return res.status(400).json({ errors: [{ msg: 'word already exists' }] });
    }

    newWord = new MasteredWords({
      word,
      meaning,
      mastered,
      weight,
    });

    await newWord.save();

    res.send(newWord);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.edit_a_word_from_game = async (req, res) => {
  try {
    const { weight } = req.body;
    const id = req.params.id;

    const updatedWord = await MasteredWords.update(
      { weight },
      { where: { id } }
    );

    if (!updatedWord) {
      return res.status(404).json({ message: 'Word not found' });
    }

    res.json('word updated');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error updating word' });
  }
};

exports.delete_a_word_from_game = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedWord = await MasteredWords.destroy({
      where: {
        id: id,
      },
    });

    if (!deletedWord) {
      return res.status(404).json({ message: 'word not found' });
    }

    res.json({ msg: 'word delete successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
};
