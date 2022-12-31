import { useContext, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { GameModeContext, GameModeContextProvider } from './context/GameMode';
import Local from './Local/Local';
import Online from './Online/Online';
import HomePage from './HomePage';

const App = () => {

  return (
    <>
      <GameModeContextProvider>    
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/local' element={<Local/>}></Route>
          <Route path='/online' element={<Online/>}></Route>
        </Routes>
      </GameModeContextProvider>

    </>
  );
}

export default App;