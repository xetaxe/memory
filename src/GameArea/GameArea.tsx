import React, {useContext} from 'react';
import './GameArea.scss';
import { GameStatusContext, IGameStatusContext } from "../App";

const EMOJI_ARRAY: string[] = ["✌","😂","😝","😁","😱","🙌","🍻","🔥","🌈","🌹","😡","🐶","🐬", "👀","🚗","🍎","💝","👌","😍","😉","😓","😳","💪","💩","🎉","🌺","👠","⚾","🏆","👽","💀","🐵","🐮","🐎","💣","👃","🍓","👊","💋","😘","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🐰","🐍","🐫","🚲","🍉"]


type CardProps = {
  cardId: number
}

function Card({cardId}: CardProps) {
  return (
    <div className="Card">
      {EMOJI_ARRAY[cardId]}
    </div>
  )
}


type PauseMenuProps = {
  test: string
}

function PauseMenu({test}: PauseMenuProps) {

  const useGameContext: IGameStatusContext = useContext(GameStatusContext);

  return (
    <div className={`PauseMenu ${useGameContext.gameStatus != "pause" ? "hide" : ""}`}>
      <button className="ResumeGameButton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("play") : ""}>Resume Game</button>
    </div>
  )
}


type EndMenuProps = {
  test: string
}

function EndMenu({test}: EndMenuProps) {
  
  const useGameContext: IGameStatusContext = useContext(GameStatusContext);

  return (
    <div className={`EndMenu ${useGameContext.gameStatus != "end" ? "hide" : ""}`}>
      <button className="RestartGameButton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("define") : ""}>Restart Game</button>
    </div>
  )
}


type GameAreaProps = {
  numCards: number
}

export default function GameArea({numCards}: GameAreaProps) {

  const cards: React.ReactElement[] = [];

    for(let i:number=0; i<numCards; i++){
      cards.push(<Card cardId={i}/>);
    };

  const useGameContext: IGameStatusContext = useContext(GameStatusContext);

  return (
    <div className={`GameArea 
                  ${useGameContext.gameStatus === "define" ? "hide" : ""}`}>
      <div className={`CardsArea 
                  ${useGameContext.gameStatus === "pause" ? "blur" : ""}
                  ${useGameContext.gameStatus === "end" ? "blur" : ""}`}>
        {cards}
      </div>
      <button className="PauseGameButton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("pause") : ""}>Pause Game</button>
      <button className="EndGameButton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("end") : ""}>End Game</button>
    <PauseMenu test="test"></PauseMenu>
    <EndMenu test="test"></EndMenu>
    </div>
  );
}