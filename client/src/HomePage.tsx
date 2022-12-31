import React, {useState, useEffect, createContext, useCallback, useContext} from 'react';
import { Link } from 'react-router-dom';
import { GameModeContext } from './context/GameMode';

import './HomePage.scss';

import io from 'socket.io-client';

const HomePage: React.FC = () => {

  const GameMode = useContext(GameModeContext);

  return (
    <>
      <h1 className="webtitle"> EPIC MEMOJY </h1>
      <div className="optionsmenu">
      <div className="optionsmenu__title">
          Play online or in your PC:
        </div>
        <div className="gamemode">
          <Link to="/online">
            <button onClick={e => GameMode?.setGameMode("online")}
            className={`gamemode__online ${GameMode?.gameMode === "online" ? "gamemode__online--highlight" : ""}`}>
              <svg className="gamemode__online_svg" viewBox='0 0 48 48'>
                <path d="M6 44V30.5h6v-8h10.5v-5h-6V4h15v13.5h-6v5H36v8h6V44H27V30.5h6v-5H15v5h6V44Zm13.5-29.5h9V7h-9ZM9 41h9v-7.5H9Zm21 0h9v-7.5h-9Zm-6-26.5Zm-6 19Zm12 0Z"/>
              </svg>
              <span>ONLINE</span>
            </button>
          </Link>
          <Link to="/local">
            <button onClick={e => GameMode?.setGameMode("local")}
            className={`gamemode__online ${GameMode?.gameMode === "local" ? "gamemode__local--highlight" : ""}`}>
              <svg className="gamemode__local_svg" viewBox='0 0 48 48'>
                <path d="M3.5 42q-.65 0-1.075-.425Q2 41.15 2 40.5q0-.65.425-1.075Q2.85 39 3.5 39h41q.65 0 1.075.425Q46 39.85 46 40.5q0 .65-.425 1.075Q45.15 42 44.5 42ZM7 36q-1.2 0-2.1-.9Q4 34.2 4 33V9q0-1.2.9-2.1Q5.8 6 7 6h34q1.2 0 2.1.9.9.9.9 2.1v24q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h34V9H7v24Zm0 0V9v24Z"/>
              </svg>
              <span>LOCAL</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;