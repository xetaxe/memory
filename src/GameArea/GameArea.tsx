import React from 'react';
import './GameArea.scss';

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
  startGame: boolean,
  numCards: number
}

export default function GameArea({startGame, numCards}: GameAreaProps) {

  const cards: React.ReactElement[] = [];

    for(let i:number=0; i<numCards; i++){
      cards.push(<Card cardId={i}/>);
    };

  return (
    <div className={`GameArea ${startGame ? "show" : ""}`}>
      {cards}
      {EMOJI_ARRAY.length}
    </div>
  );
}