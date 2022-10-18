import React, {useEffect, useState} from 'react';
import GameArea from './GameArea';
import OptionsMenu from './OptionsMenu';


const difficultyArray: { level: number, numCards: number }[] = [
  {"level": 1, "numCards": 10}, 
  {"level": 2, "numCards": 16}, 
  {"level": 3, "numCards": 24}, 
  {"level": 4, "numCards": 36}, 
  {"level": 5, "numCards": 48},
];

let App: React.FC = () => {

  const [difficulty, setDifficulty] = useState(difficultyArray[0]);
  const [startGame, setStartGame] = useState(false);

  return (
    <>
      <OptionsMenu startGame= {startGame} difficulty={difficulty} difficultyArray={difficultyArray} onChange={difOpt => setDifficulty(difOpt)}/>
      <GameArea startGame= {startGame} numCards={difficulty.numCards}/>
    </>
  );
}

export default App;