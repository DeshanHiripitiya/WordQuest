import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Game() {
  const [masteredWords, setMasteredWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    // Fetch mastered words from the server
    axios
      .get('http://localhost:5000/api/game')
      .then((response) => {
        setMasteredWords(response.data);
      })
      .catch((error) => {
        console.error('Error fetching mastered words:', error);
      });
  }, []);

  const startGame = () => {
    if (masteredWords.length > 0) {
      const randomWord =
        masteredWords[Math.floor(Math.random() * masteredWords.length)];
      setCurrentWord(randomWord);
      setGameStarted(true);
      setUserInput('');
      setResultMessage('');
    }
  };

  const checkAnswer = () => {
    if (currentWord.word.toLowerCase() === userInput.trim().toLowerCase()) {
      // Correct answer
      axios
        .put(`http://localhost:5000/api/game/${currentWord._id}`, {
          weight: currentWord.weight + 1,
        })
        .then((response) => {
          setResultMessage('Correct!');
          setCurrentWord(response.data);
        })
        .catch((error) => {
          console.error('Error updating word weight:', error);
        });
    } else {
      // Incorrect answer
      setResultMessage(`Incorrect! The correct word is ${currentWord.word}.`);
    }
  };

  const addToDictionary = () => {
    axios
      .post('http://localhost:5000/api/words', {
        word: currentWord.word,
        meaning: currentWord.meaning,
        mastered: false,
        weight: 0,
      })
      .then(() => {
        setMasteredWords((prevWords) =>
          prevWords.filter((word) => word._id !== currentWord._id)
        );
        deleteFromMasteredWords(currentWord._id);
        setResultMessage('Word added back to dictionary.');
      })
      .catch((error) => {
        console.error('Error adding word to dictionary:', error);
      });
  };

  const deleteFromMasteredWords = (id) =>{
axios
  .delete(`http://localhost:5000/api/game/${id}`)
  .then(() => {
    setCurrentWord(null);
    setGameStarted(false);
  })
  .catch((error) => {
    console.error('Error deleting word:', error);
  });
  }
git 
  return (
    <div className='p-4 border border-gray-400 rounded'>
      <h2 className='text-lg font-bold mb-4'>Word Game</h2>
      {!gameStarted ? (
        <button
          onClick={startGame}
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Start Game
        </button>
      ) : (
        <div>
          <div className='mb-4'>
            <span className='font-bold'>Meaning:</span> {currentWord.meaning}
          </div>
          <input
            type='text'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className='border p-2 rounded mb-4'
            placeholder='Enter the word'
          />
          <button
            onClick={checkAnswer}
            className='px-4 py-2 bg-green-500 text-white rounded mr-2'
          >
            Check
          </button>
          {resultMessage && (
            <div className='mt-4'>
              <p>{resultMessage}</p>
              <button
                onClick={startGame}
                className='px-4 py-2 bg-blue-500 text-white rounded'
              >
                Next
              </button>
              {resultMessage.includes('Incorrect') && (
                <button
                  onClick={addToDictionary}
                  className='px-4 py-2 bg-blue-500 text-white rounded mt-2 ml-10'
                >
                  Add to Dictionary
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
