import React, {useContext} from 'react';
import './OptionsMenu.scss';
import { GameStatusContext, IGameStatusContext } from "../App";

type difficultyOption = {
  level: number,
  numCards: number
}

type OptionsMenuProps = {
  difficulty: difficultyOption,
  difficultyArray: difficultyOption[],
  onChange: (value: difficultyOption) => void 
}


export default function OptionsMenu({difficulty, difficultyArray, onChange}:OptionsMenuProps) {

  const chooseDifficulty = (value: string) => {
    let foundDifficulty: difficultyOption | undefined = difficultyArray.find(obj => obj.level === parseInt(value));
    if(foundDifficulty === undefined) {
      foundDifficulty = difficultyArray[0];
    }
    onChange(foundDifficulty);
  }

  const useGameContext: IGameStatusContext = useContext(GameStatusContext);



  return (
    <div className={`OptionsMenu ${useGameContext.gameStatus != "define" ? "hide" : ""}`}>
      <div>
        Choose the difficulty!
      </div>
      <div>
      Level: {difficulty.level} <br/>
      Num. of cards: {difficulty.numCards};
      </div>
      <input type="range" min="1" max="5" value={difficulty.level} className="DifRange" onChange={e => chooseDifficulty(e.target.value)}/>
      <button className="StartGameButton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("play") : ""}>Start Game!</button>
    </div>
  );
}