import React from 'react'
import WordInputForm from './InputWords';
import Dictionory from './Dictionory';
import Game from './Game';

function WordQuest() {
  return (
    <div className='grid grid-rows-2 grid-cols-2 gap-0 border border-black w-full h-screen'>
      <div className='row-span-1 col-span-1 border border-black'>
        <WordInputForm />
      </div>
      <div className='row-span-2 col-span-1 border border-black'>
        <Dictionory/>
      </div>
      <div className='row-span-1 col-span-1 border border-black'>
        <Game />
      </div>
    </div>
  );
}

export default WordQuest
