const express = require('express');
const router = express.Router();

const { MasteredWords } = require('../../models/Models');

router.get('/',
async(req,res)=>{
try{
    const id = req.params.id;
    const word = await MasteredWords.find();
    res.json(word);
}catch(err){
    console.error(err);
    res.send(500).json({msg:"server error"});
}
});

router.post('/',
    async(req,res)=>{
        let { word, meaning, mastered, weight } = req.body;
        mastered = true;
        weight= 0;
        try {
          let word1 = await MasteredWords.findOne({ word });
          if (word1) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'word already exists' }] });
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
    }
)

router.put(
  '/:id',
  async (req, res) => {
    try {
      const { weight } = req.body;
      const id = req.params.id;

      const updatedWord = await MasteredWords.findByIdAndUpdate(
        id,
        { $set: { weight } },
        { new: true }
      );
      
      if (!updatedWord) {
        return res.status(404).json({ message: 'Word not found' });
      }

      res.json({ updatedWord });
    } catch(err) {
      console.error(err);
      res.status(500).json({ message: 'error updating word' });
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedWord = await MasteredWords.findByIdAndDelete(id);

    if (!deletedWord) {
      return res.status(404).json({ message: 'word not found' });
    }

    res.json({ msg: 'word delete successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
});

module.exports = router;