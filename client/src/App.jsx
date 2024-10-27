import React from 'react';
import WordQuest from './component/WordQuest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';

import Login from './pages/Registration';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          {/* <Route path='/' element={<div>login</div>}></Route> */}
          <Route path='/WordQuest' element={<WordQuest />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
