import { useContext } from "react";
import './OtherMenus.scss';
import { GameStatusContext } from '../../Online';


function PauseMenu({players}: PauseMenuProps) {

  const useGameContext = useContext(GameStatusContext);

  return (
    <div className={`pausemenu ${useGameContext.gameStatus !== "pause" ? "hide" : ""}`}>
      <div className="pausemenu__scores">Scores: 
        <ul className="pausemenu__scoreslist">
          {players.map(player => <li className="pausemenu__scoresitem">{player.name}: {player.score}</li>)}
        </ul>
      </div>
      <button className="pausemenu__resumebutton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("play") : ""}>Resume Game</button>
    </div>
  )
}

function RestartMenu() {
  const useGameContext = useContext(GameStatusContext);
  return (
    <div className={`restartmenu ${useGameContext.gameStatus !== "restart" ? "hide" : ""}`}>
      <div className="restartmenu__title">Are you sure you want to restart the game?</div>
      <button className="restartmenu__resumebutton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("play") : ""}>Resume Game</button>
      <button className="restartmenu__restartbutton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("define") : ""}>Restart Game</button>
    </div>
  )
}

function SettingsMenu({cardPattern, changeCardPattern}: SettingsMenuProps) {
  const useGameContext = useContext(GameStatusContext);
  return (
    <div className={`settingsmenu ${useGameContext.gameStatus !== "settings" ? "hide" : ""}`}>
      <div className="settingsmenu__title">Game settings:</div>
      <div className='settingsmenu__cardpattern'>
        Card pattern:
        <div className="settingsmenu__cardpatternoptions">
          <img style={cardPattern === 1 ? {boxSizing: "content-box", border: "4px solid aliceblue"} : {}} className="settingsmenu__cardpatternoption" src={"/img/card_pattern"+1+".png"} alt="card_pattern1" onClick={() => changeCardPattern(1)} data-value="1"/>
          <img style={cardPattern === 2 ? {boxSizing: "content-box", border: "4px solid aliceblue"} : {}} className="settingsmenu__cardpatternoption" src={"/img/card_pattern"+2+".png"} alt="card_pattern2" onClick={() => changeCardPattern(2)} data-value="2"/>
          <img style={cardPattern === 3 ? {boxSizing: "content-box", border: "4px solid aliceblue"} : {}} className="settingsmenu__cardpatternoption" src={"/img/card_pattern"+3+".png"} alt="card_pattern3" onClick={() => changeCardPattern(3)} data-value="3"/>
          <img style={cardPattern === 4 ? {boxSizing: "content-box", border: "4px solid aliceblue"} : {}} className="settingsmenu__cardpatternoption" src={"/img/card_pattern"+4+".png"} alt="card_pattern4" onClick={() => changeCardPattern(4)} data-value="4"/>
        </div>
      </div>
      <button className="settingsmenu__resumebutton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("play") : ""}>Resume Game</button>
    </div>
  )
}


function EndMenu({players}: EndMenuProps) {
  
  const useGameContext = useContext(GameStatusContext);
  const orderedPlayers: Player[] = players.slice();
  orderedPlayers.sort((a,b) => (a.score < b.score) ? 1 : -1);

  return (
    <div className={`endmenu ${useGameContext.gameStatus !== "end" ? "hide" : ""}`}>
      <div className="endmenu__scores">Scores: 
        <ul className="endmenu__scoreslist">
          {orderedPlayers.map((player,index) =>             
            <li className="endmenu__scoresitem">
              <img className="endmenu__scoresimg" height="30" width="30" src={"/img/p"+index+".png"}/>{player.name.toUpperCase() }
              : <span> &nbsp; &nbsp;</span> {player.score}
            </li>)}
        </ul>
      </div>
      <button className="endmenu__restartbutton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("define") : ""}>Restart Game</button>
    </div>
  )
}

export {PauseMenu, RestartMenu, SettingsMenu, EndMenu}