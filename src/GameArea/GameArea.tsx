import React, {useState, useEffect, useContext, useMemo, ReactElement} from 'react';
import './GameArea.scss';
import { GameStatusContext, IGameStatusContext } from "../App";
import { createDecipheriv } from 'crypto';

const EMOJI_ARRAY: string[] = ["✌","😂","😝","😁","😱","🙌","🍻","🔥","🌈","🌹","😡","🐶","🐬", "👀","🚗","🍎","💝","👌","😍","😉","😓","😳","💪","💩","🎉","🌺","👠","⚾","🏆","👽","💀","🐵","🐮","🐎","💣","👃","🍓","👊","💋","😘","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🐰","🐍","🐫","🚲","🍉"]

const cardShow: string[] = ["hidden", "clicked", "reveal"];

type CardProps = {
  cardId: number,
  cardContent: string,
  cardReveal: string,
  revealCard: (cardId: number) => void
}

type PauseMenuProps = {
  test: string
}

type EndMenuProps = {
  test: string
}



function Card({cardId, cardContent, cardReveal, revealCard}: CardProps) {
  const cardShowContent = (cardReveal === cardShow[0] ? "" : cardContent);
  return (
    <div className="Card" onClick={(e) => revealCard(cardId)}>
      {cardShowContent}
    </div>
  )
}


function PauseMenu({test}: PauseMenuProps) {

  const useGameContext: IGameStatusContext = useContext(GameStatusContext);

  return (
    <div className={`PauseMenu ${useGameContext.gameStatus != "pause" ? "hide" : ""}`}>
      <button className="ResumeGameButton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("play") : ""}>Resume Game</button>
    </div>
  )
}


function EndMenu({test}: EndMenuProps) {
  
  const useGameContext: IGameStatusContext = useContext(GameStatusContext);

  return (
    <div className={`EndMenu ${useGameContext.gameStatus != "end" ? "hide" : ""}`}>
      <button className="RestartGameButton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("define") : ""}>Restart Game</button>
    </div>
  )
}


////////////////// WHOLE GAME AREA /////////////////////

type GameAreaProps = {
  numCards: number
}

type CardState = {
  cardId: number,
  cardContent: string,
  cardReveal: string
}

export default function GameArea({numCards}: GameAreaProps) {

  let cards: ReactElement[] = [];
  const [cardsState, setCardsState] = useState<CardState[]>([]);

  useEffect(() => {
    const cardsContent: string[] = RandomCardPairs(EMOJI_ARRAY, numCards);
    setCardsState(cardsContent.map((val, index) => ({cardId:index, cardContent: val, cardReveal: cardShow[0]})));
  }, [numCards]);

  console.log(cardsState);

  const revealCard = (cardId: number) => {
    let cardIndex = cardsState.findIndex(card => card.cardId === cardId)
    let cardsTempState = cardsState;
    cardsTempState[cardIndex].cardReveal = cardShow[1];
    setCardsState(cardsTempState);
  }

  useEffect(() => {
    cards = cardsState.map(card => ( <Card {...card} revealCard={revealCard}/>));
    console.log(cards);
  }, [cardsState]);

  const useGameContext: IGameStatusContext = useContext(GameStatusContext);

  cards = cardsState.map(card => ( <Card {...card} revealCard={revealCard}/>));

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


////////Return random emoji pairs logic
function RandomCardPairs(referenceArray: string[], numCards: number) {
  let randomCardPairs: string[] = [];

  while (randomCardPairs.length < numCards) {

    let randomIndex: number = Math.floor(Math.random() * referenceArray.length);
    let randomEmoji: string = referenceArray[randomIndex];

    if (randomCardPairs.find(val => val === randomEmoji) === undefined) {
      randomCardPairs.push(randomEmoji, randomEmoji)
    }
  }

  randomCardPairs = shuffleArray(randomCardPairs);

  return randomCardPairs;
}

///////Shuffle array algorithm (Fisher-Yates algorithm)
function shuffleArray(array: string[]) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}