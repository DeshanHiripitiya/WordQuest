const express = require('express');
const router = express.Router();


const { Dictionary } = require('../../models/Models');
const {check, validationResult } = require('express-validator');


router.get('/', 
 
async(req, res) => {
    try{
    const words = await Dictionary.find();
    res.json(words);
}catch(err) {
    console.error(err.message);
    res.status(500).send('server error');
}}
);

router.put('/',[
  check('word', 'Name is required').notEmpty(),
  check('meaning', 'meaning is required').notEmpty(),
],//validation
async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.arrray() });
    }
    try{
const {word,meaning} = req.body;
const id = req.params.id;

const updatedWord = await Dictionary.findOneAndUpdate(
  id,
  { $set: { word, meaning } },
  { new: true } //return to updated document
);
res.json({updatedWord});
    }catch{
console.error(err);
res.status(500).json({message:"error updating word"});
    }
})

router.delete('/:id',
    async(req,res) => {
        try{
const id = req.params.id;
 const deletedWord = await Dictionary.findByIdAndDelete(id);

 if(!deletedWord){
    return res.status(404).json({message:"word not found"});
 }

 res.json({msg:"word delete successfully"});
}catch(err){
console.error(err);
res.status(500).json({msg:"server error"});
}
    }
)

module.exports = router;