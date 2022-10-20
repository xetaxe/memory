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

const gameStatusArray: string[] = ["define", "play", "pause", "end"]

export interface IGameStatusContext {
  gameStatus?: string,
  setGameStatus?: (value: string) => void;
}

export const GameStatusContext = createContext<IGameStatusContext>({});


let App: React.FC = () => {

  const [difficulty, setDifficulty] = useState(difficultyArray[0]);
  const [gameStatus, setGameStatus] = useState(gameStatusArray[0]);

  const AppGameStatus: IGameStatusContext = {gameStatus, setGameStatus}



  return (
    <GameStatusContext.Provider value={AppGameStatus}>
      <OptionsMenu difficulty={difficulty} difficultyArray={difficultyArray} onChange={difOpt => setDifficulty(difOpt)}/>
      <GameArea numCards={difficulty.numCards}/>
    </GameStatusContext.Provider>
  );
}

export default App;