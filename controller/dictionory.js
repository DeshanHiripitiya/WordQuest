router.get('/search/:word', (req, res) => {
  const word = req.params.word;
  const meaning = trie.search(word);

  if (meaning) {
    res.json({ word, meaning });
  } else {
    res.status(404).json({ message: 'Word not found' });
  }
});


router.get('/autocomplete/:prefix', (req, res) => {
  const prefix = req.params.prefix;
  const suggestions = trie.getWordsWithPrefix(prefix);

  res.json(suggestions);
});


router.get('/spellcheck/:word', (req, res) => {
  const word = req.params.word;
  const suggestions = trie.spellCheck(word);

  if (suggestions.length > 0) {
    res.json(suggestions);
  } else {
    res.status(404).json({ message: 'No close matches found' });
  }
});
