import { createContext, useContext, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { GameModeContextProvider } from './context/GameMode';
import Local from './Local/Local';
import Online from './Online/Online';
import HomePage from './HomePage';
import { RoomCodeContextProvider } from './context/RoomCode';

const App = () => {

  return (
    <>
      <GameModeContextProvider>
        <RoomCodeContextProvider>   
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/local' element={<Local/>}></Route>
            <Route path='/online' element={<Online/>}></Route>
          </Routes>
        </RoomCodeContextProvider> 
      </GameModeContextProvider>

    </>
  );
}

export default App;