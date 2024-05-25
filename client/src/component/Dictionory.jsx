import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dictionary() {
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    // Fetch initial word list from the server
    axios
      .get('http://localhost:5000/api/dictionory')
      .then((response) => {
        setWordList(response.data); // Assuming response.data is an array of words
      })
      .catch((error) => {
        console.error('Error fetching word list:', error);
      });
  }, []);

//   const handleEdit = () =>{
    
//   }

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/dictionory/${id}`)
      .then(() => {
        setWordList((prevList) => prevList.filter((word) => word._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting word:', error);
      });
  };

  const handleRemove = (word) => {
    axios
      .post(`http://localhost:5000/api/game`, {
        word: word.word,
        meaning: word.meaning,
      })
      .then(() => {
        handleDelete(word._id);
      })
      .catch((error) => {
        console.error('Error moving word to mastered words:', error);
      });
  };

  return (
    <div className='p-4 border border-gray-400 rounded'>
      <div className='mt-4'>
        <h2 className='text-lg font-bold mb-2'>Word List</h2>
        <ul className='divide-y divide-gray-300'>
          {/* Displaying the word list */}
          {Array.isArray(wordList) && wordList.length > 0 ? (
            wordList.map((item, index) => (
              <li key={item._id} className='py-2'>
                <div className='flex space-x-4'>
                  <span className='font-bold'>{item.word}: </span>
                  <span className='pr-10'>{item.meaning}</span>

                  {/* <button
                      onClick={handleEdit}
                    className='px-4 py-2 bg-blue-500 text-white rounded '
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='px-4 py-2 bg-red-500 text-white rounded '
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleRemove(item)}
                    className='px-4 py-2 bg-green-500 text-white rounded '
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className='py-2 text-gray-500'>No words found</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dictionary;
