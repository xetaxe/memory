import React, {useContext} from 'react';
import './OptionsMenu.scss';
import { GameStatusContext, IGameStatusContext } from "../App";

const LEVELS_ARRAY: { level: number, numCards: number }[] = [
  {"level": 1, "numCards": 10}, 
  {"level": 2, "numCards": 16}, 
  {"level": 3, "numCards": 24}, 
  {"level": 4, "numCards": 36}, 
  {"level": 5, "numCards": 48},
];

const DEFAULT_PLAYERS: { id: number, name: string}[] = [
  {"id": 1, "name": "Player 1"},
  {"id": 2, "name": "Player 2"},
  {"id": 3, "name": "Player 3"},
  {"id": 4, "name": "Player 4"},
];


type LevelOption = {
  level: number,
  numCards: number
}

type Player = { 
  id: number, 
  name: string
}

type OptionsMenuProps = {
  level: LevelOption,
  updateLevel: (value: LevelOption) => void,
  players: Player[],
  updatePlayers: (value: Player[]) => void, 
}


export default function OptionsMenu({level, updateLevel, players, updatePlayers}:OptionsMenuProps) {

  const chooseLevel = (newLevel: string) => {
    let foundLevel: LevelOption | undefined = LEVELS_ARRAY.find(elem => elem.level === parseInt(newLevel));
    if(foundLevel === undefined) {
      foundLevel = LEVELS_ARRAY[0];
    }
    updateLevel(foundLevel);
  }

  const updateNumPlayers = (currentPlayers: Player[], newNumber: number) => {
    const numPlayers = currentPlayers.length;
    const updatedPlayers = currentPlayers.slice();
    if(numPlayers > newNumber) {
      updatedPlayers.splice(newNumber);
    } else {
      for(let i=numPlayers; i<newNumber; i++){
        updatedPlayers.push(DEFAULT_PLAYERS[i]);
      }
    }
    updatePlayers(updatedPlayers);
  }

  const updateNamePlayers = (players: Player[], playerToRename: Player, newName: string) => {
    //Name validations here
    if(newName.length < 2)
      return
    console.log("hola");
    updatePlayers(
      players.map(player =>{
        if (player.id === playerToRename.id) {
          return {...player, name: newName}
        }
        return player;
      })
    );
  }

  const useGameContext: IGameStatusContext = useContext(GameStatusContext);



  return (
    <div className={`OptionsMenu ${useGameContext.gameStatus !== "define" ? "hide" : ""}`}>
      <div>
        Choose the difficulty!
      </div>
      <div>
      Level: {level.level} <br/>
      Num. of cards: {level.numCards};
      </div>
      <input type="range" min="1" max="5" value={level.level} className="DifRange" onChange={e => {e.preventDefault(); chooseLevel(e.target.value)}}/>
      <div>
      Number of Players: {players.length} <br/>
      <button className="ButtonNumPlayers" onClick={e => updateNumPlayers(players, 2)}>2</button>
      <button className="ButtonNumPlayers" onClick={e => updateNumPlayers(players, 3)}>3</button>
      <button className="ButtonNumPlayers" onClick={e => updateNumPlayers(players, 4)}>4</button><br/>
      <ul className="NamePlayers">
        Click to edit the names!
        {players.map(player => (<li>
            <div> Player {player.id}</div>
            <div> Name: 
              <input type="text" defaultValue= {player.name}
                onBlur={ e => {
                  if(e.currentTarget.value.length < 2){
                    e.target.value = player.name;
                    return;
                  }
                  updateNamePlayers(players, player, e.currentTarget.value)
                } }
                onKeyPress={ e => {
                    if (e.key === "Enter" || e.key === "Tab") {
                      e.currentTarget.blur()
                      updateNamePlayers(players, player, e.currentTarget.value)
                    }
                    // if (e.key === "Tab") {
                    //   updateNamePlayers(players, player, e.currentTarget.value)
                    // }
                } } 
              /> 
            </div>
          </li>))}
      </ul>
      </div>
      <button className="StartGameButton" onClick={e => useGameContext.setGameStatus !== undefined ? useGameContext.setGameStatus("play") : ""}>Start Game!</button>
    </div>
  );
}