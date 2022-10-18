import React from 'react';
import './OptionsMenu.scss';

type difficultyOption = {
  level: number,
  numCards: number
}

type OptionsMenuProps = {
  startGame: boolean,
  difficulty: difficultyOption,
  difficultyArray: difficultyOption[],
  onChange: (value: difficultyOption) => void 
}


export default function OptionsMenu({startGame, difficulty, difficultyArray, onChange}:OptionsMenuProps) {

  const chooseDifficulty = (value: string) => {
    let foundDifficulty: difficultyOption | undefined = difficultyArray.find(obj => obj.level === parseInt(value));
    if(foundDifficulty === undefined) {
      foundDifficulty = difficultyArray[0];
    }
    onChange(foundDifficulty);
  }

  return (
    <div className={`OptionsMenu ${startGame ? "hide" : ""}`}>
      <div>
        Choose the difficulty!
      </div>
      <div>
      Level: {difficulty.level} <br/>
      Num. of cards: {difficulty.numCards};
      </div>
      <input type="range" min="1" max="5" value={difficulty.level} className="DifRange" onChange={e => chooseDifficulty(e.target.value)}/>
      <button className="StartGameButton">Start Game!</button>
    </div>
  );
}