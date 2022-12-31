import React, {useState, useEffect, createContext, useCallback, useContext} from 'react';
import { Link } from 'react-router-dom';
import { GameModeContext } from './context/GameMode';

const HomePage: React.FC = () => {

  const GameMode = useContext(GameModeContext)

  return (
    <>
      <h1 className="webtitle"> EPIC MEMOJY </h1>
      <ul>
        <li>
          <Link to="/"><button>Back</button></Link>
        </li>
        <li>
          <Link to="/local" >Local</Link>
        </li>
        <li>
          <Link to="/online">Online</Link>
        </li>
      </ul>
    </>
  );
}

export default HomePage;