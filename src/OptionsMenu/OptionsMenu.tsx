import React, {useContext} from 'react';
import './OptionsMenu.scss';
import { GameStatusContext, IGameStatusContext } from "../App";

type DifficultyOption = {
  level: number,
  numCards: number
}

type PlayerInfo = { 
  id: number, 
  name: string, 
  score: number 
}

type OptionsMenuProps = {
  difficulty: DifficultyOption,
  difficultyArray: DifficultyOption[],
  setDifficulty: (value: DifficultyOption) => void,
  playersInfo: PlayerInfo[],
  defaultPlayers: PlayerInfo[],
  setPlayersInfo: (value: PlayerInfo[]) => void, 
}


export default function OptionsMenu({difficulty, difficultyArray, setDifficulty, playersInfo, defaultPlayers, setPlayersInfo}:OptionsMenuProps) {

  const chooseDifficulty = (value: string) => {
    let foundDifficulty: DifficultyOption | undefined = difficultyArray.find(obj => obj.level === parseInt(value));
    if(foundDifficulty === undefined) {
      foundDifficulty = difficultyArray[0];
    }
    setDifficulty(foundDifficulty);
  }

  const updatePlayersInfo = (currentInfo: PlayerInfo[], newNumber: number) => {

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
      <div>
      Number of Players: {playersInfo.length} <br/>
      <button className="ButtonNumPlayers" onClick={e => updatePlayersInfo(playersInfo, 2)}>2</button>
      <button className="ButtonNumPlayers" onClick={e => updatePlayersInfo(playersInfo, 3)}>3</button>
      <button className="ButtonNumPlayers" onClick={e => updatePlayersInfo(playersInfo, 4)}>4</button>
      Players: {playersInfo.map(players => players.name)};
      </div>
      <button className="StartGameButton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("play") : ""}>Start Game!</button>
    </div>
  );
}