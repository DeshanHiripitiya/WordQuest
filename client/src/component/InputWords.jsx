import React, { useState,useEffect,useRef } from 'react';
import axios from 'axios';

function WordInputForm() {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');

  const inputRef = useRef(null);

  useEffect(()=>{
inputRef.current.focus();
  })

  const handleAdd = () => {
    const data = {
      word,
      meaning,
    };

    axios
      .post('http://localhost:5000/api/words', data)
      .then((response) => {
        console.log('Data successfully sent:', response.data);
        handleClear();
      })
      .catch((error) => {
        console.error('There was an error sending the data!', error);
      });
  };

  const handleClear = () => {
    setWord('');
    setMeaning('');
  };

  return (
    <div className='p-4 border border-gray-400 rounded'>
      <div className='mb-4'>
        <label className='block text-gray-700'>Word</label>
        <input
          type='text'
          ref={inputRef}
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className='w-full p-2 border border-gray-400 rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Meaning</label>
        <input
          type='text'
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className='w-full p-2 border border-gray-400 rounded'
        />
      </div>
      <div className='flex space-x-4'>
        <button
          onClick={handleAdd}
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Add
        </button>
        <button
          onClick={handleClear}
          className='px-4 py-2 bg-gray-500 text-white rounded'
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default WordInputForm;
