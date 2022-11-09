import React, {useContext} from 'react';
import './OptionsMenu.scss';
import { GameStatusContext, IGameStatusContext } from "../App";

// const LEVELS_ARRAY: { level: number, numCards: number }[] = [
//   {"level": 1, "numCards": 16},
//   {"level": 2, "numCards": 24},
//   {"level": 3, "numCards": 32},
//   {"level": 4, "numCards": 40},
//   {"level": 5, "numCards": 48},
// ];

const DEFAULT_PLAYERS: { id: number, name: string}[] = [
  {"id": 1, "name": "Player 1"},
  {"id": 2, "name": "Player 2"},
  {"id": 3, "name": "Player 3"},
  {"id": 4, "name": "Player 4"},
];


type Player = {
  id: number,
  name: string
}

type OptionsMenuProps = {
  totalCards: number,
  updateTotalCards: (newTotalCards: number, incrementTotalCards: number) => void,
  players: Player[],
  updatePlayers: (value: Player[]) => void,
}


export default function OptionsMenu({totalCards, updateTotalCards, players, updatePlayers}:OptionsMenuProps) {

  const chooseCards = (newTotalCards: number, incrementTotalCards: number) => {
    if (incrementTotalCards === 0) {
      if (typeof newTotalCards === "number") {
        if (newTotalCards % 2 === 1) {
          console.log("The total number of cards must be even!");
          return totalCards;
        } 
        if (newTotalCards < 2) {
          console.log("Too few cards!");
          return totalCards;
        } else if (newTotalCards > 110) {
          console.log("Too many cards!");
          return totalCards;
        }
      }

      updateTotalCards(newTotalCards, 0);
    } else {
      if ((totalCards + incrementTotalCards) >= 2 && (totalCards + incrementTotalCards) <= 110)
        updateTotalCards(0, incrementTotalCards);
    }
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
    if(newName.length > 10){
      console.log("The name is too long!");
      return
    }
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
    <div className={`optionsmenu ${useGameContext.gameStatus !== "define" ? "hide" : ""}`}>
      <div className="difficultyoptions">
        <div className="difficultyoptions__title">
          Choose the number of cards!
        </div>
        <div className='difficultyoptions__selectcontainer'>
          <div className='difficultyoptions__selector'>
            <button className="difficultyoptions__less" onClick={e => chooseCards(0, -2)}> <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M28 34 18 24l10-10Z"/></svg> </button>
            <input className="difficultyoptions__value" type="text" defaultValue={totalCards} value= {totalCards}
              onFocus={e => e.currentTarget.value = ""}
              onBlur={ e => {
                chooseCards(parseInt(e.currentTarget.value), 0);
                // if (e.currentTarget.value === undefined)
                //   e.currentTarget.value = totalCards;
              }}
              onKeyPress={ e => {
                e.preventDefault();
                if (e.key === "Enter" || e.key === "Tab") {
                  chooseCards(parseInt(e.currentTarget.value), 0);
                  e.currentTarget.blur();
                }
                else {
                  e.currentTarget.value += e.key;
                }
              }}
            />
            <button className="difficultyoptions__more" onClick={e => chooseCards(0, 2)}> <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M28 34 18 24l10-10Z"/></svg></button>          
          </div>
        </div>
        <div className='difficultyoptions__info'>
        Num. of cards: {totalCards} <span className='difficultyoptions__infopairs'>({totalCards / 2} pairs)</span>
        </div>
      </div>
      <div className='playersoptions'>
        <div className='playersoptions__title'>Number of Players:</div>
        <div className="playersoptions__buttons">
          <button className={`playersoptions__button ${players.length === 2 ? "playersoptions__button--highlight" : ""}`} onClick={e => updateNumPlayers(players, 2)}>2</button>
          <button className={`playersoptions__button ${players.length === 3 ? "playersoptions__button--highlight" : ""}`} onClick={e => updateNumPlayers(players, 3)}>3</button>
          <button className={`playersoptions__button ${players.length === 4 ? "playersoptions__button--highlight" : ""}`} onClick={e => updateNumPlayers(players, 4)}>4</button>
        </div>
        <div className="playersoptions__editlist"><br/> Click to edit the names!</div>
        <ul className="playersoptions__playerlist">
          {players.map(player => (<li className="playersoptions__playeritem">
              <div className="playersoptions__playerid">🧑#{player.id} Name :</div>
              <div className="playersoptions__playername"> 
                <input className="playersoptions__playerinput" type="text" defaultValue= {player.name}
                  onBlur={ e => {
                    if( e.currentTarget.value.length < 2 || e.currentTarget.value.length > 10 ){
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
                  } }
                />
              </div>
            </li>))}
        </ul>
      </div>
      <button className="startbutton" onClick={e => useGameContext.setGameStatus !== undefined ? useGameContext.setGameStatus("play") : ""}>Start Game!</button>
    </div>
  );
}