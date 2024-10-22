const express = require('express');
const router = express.Router();

const {
  get_All_data_from_game,
  create_a_word_to_game,
  edit_a_word_from_game,
  delete_a_word_from_game,
} = require('../../controller/game');

router.get('/', get_All_data_from_game);

router.post('/', create_a_word_to_game);

router.put('/:id', edit_a_word_from_game);

router.delete('/:id', delete_a_word_from_game);

module.exports = router;
