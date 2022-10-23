import React, {useEffect, useState, createContext} from 'react';
import GameArea from './GameArea';
import OptionsMenu from './OptionsMenu';

const difficultyArray: { level: number, numCards: number }[] = [
  {"level": 1, "numCards": 10}, 
  {"level": 2, "numCards": 16}, 
  {"level": 3, "numCards": 24}, 
  {"level": 4, "numCards": 36}, 
  {"level": 5, "numCards": 48},
];

const defaultPlayers: { id: number, name: string, score: number }[] = [
  {"id": 1, "name": "Player 1", "score": 0},
  {"id": 2, "name": "Player 2", "score": 0},
  {"id": 3, "name": "Player 3", "score": 0},
  {"id": 4, "name": "Player 4", "score": 0},
];

const gameStatusArray: string[] = ["define", "play", "pause", "end"]

export interface IGameStatusContext {
  gameStatus?: string,
  setGameStatus?: (value: string) => void;
}

export const GameStatusContext = createContext<IGameStatusContext>({});


let App: React.FC = () => {

  const [difficulty, setDifficulty] = useState(difficultyArray[0]);
  const [playersInfo, setPlayersInfo] = useState(defaultPlayers.slice(0,2));
  const [gameStatus, setGameStatus] = useState(gameStatusArray[0]);

  const AppGameStatus: IGameStatusContext = {gameStatus, setGameStatus}

  return (
    <GameStatusContext.Provider value={AppGameStatus}>
      <OptionsMenu 
        difficulty={difficulty} 
        difficultyArray={difficultyArray}  
        setDifficulty={difOpt => setDifficulty(difOpt)}
        playersInfo={playersInfo}
        defaultPlayers={defaultPlayers}
        setPlayersInfo={playersUpdate => setPlayersInfo(playersUpdate)}/>
      <GameArea numCards={difficulty.numCards} playersInfo={playersInfo}/>
    </GameStatusContext.Provider>
  );
}

export default App;