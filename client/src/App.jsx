import React from 'react';
import WordQuest from './component/WordQuest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<div>login</div>}
          ></Route>
          <Route path='/WordQuest' element={<WordQuest />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;



