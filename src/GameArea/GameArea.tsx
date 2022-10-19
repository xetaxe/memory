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
    <div className={`GameArea ${useGameContext.gameStatus === "start" ? "show" : ""}`}>
      {cards}
    </div>
  );
}