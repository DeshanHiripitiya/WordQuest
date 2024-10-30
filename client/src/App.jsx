import React from 'react';
import WordQuest from './component/WordQuest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';

import Login, { Registration } from './pages/Registration';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/registration' element={<Registration   />}></Route>
          <Route path='/login' element={<div>login</div>}></Route>
          <Route path='/WordQuest' element={<WordQuest />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
