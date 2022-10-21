import React, {useState, useEffect, useContext} from 'react';
import './GameArea.scss';
import { GameStatusContext, IGameStatusContext } from "../App";

const EMOJI_ARRAY: string[] = ["✌","😂","😝","😁","😱","🙌","🍻","🔥","🌈","🌹","😡","🐶","🐬", "👀","🚗","🍎","💝","👌","😍","😉","😓","😳","💪","💩","🎉","🌺","👠","⚾","🏆","👽","💀","🐵","🐮","🐎","💣","👃","🍓","👊","💋","😘","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🐰","🐍","🐫","🚲","🍉"]

const cardStates: string[] = ["hidden", "clicked", "shown"];

type CardProps = {
  cardId: number,
  cardContent: string,
  cardsState: string[]
}

type PauseMenuProps = {
  test: string
}

type EndMenuProps = {
  test: string
}



function Card({cardId, cardContent, cardsState}: CardProps) {
  const cardShowContent = (cardsState[cardId] === cardStates[0] ? "" : {cardContent});
  return (
    <div className="Card">
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

export default function GameArea({numCards}: GameAreaProps) {

  const cards: React.ReactElement[] = [];
  const cardsContent: string[] = RandomCardPairs(EMOJI_ARRAY, numCards);
  const [cardsState, setCardsState] = useState(cardsContent.map(val => "hidden"));

  console.log(cardsContent);

    for(let i:number=0; i<numCards; i++){
      cards.push(<Card cardId={i} cardContent={cardsContent[i]} cardsState={cardsState}/>);
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


function RandomCardPairs(referenceArray: string[], numCards: number) {
  const numPairs: number = numCards/2;
  let randomIndexPairs: number[] = [];
  let randomCardPairs: string[] = [];
  let generatedPairs: number = 0;

  while (generatedPairs < numPairs) {
    let randomIndex: number = Math.floor(Math.random() * referenceArray.length)
    if (randomIndexPairs.find(val => val === randomIndex) === undefined) {
      randomIndexPairs.push(randomIndex, randomIndex)
      generatedPairs++;
    }
  }

  randomIndexPairs = shuffleArray(randomIndexPairs);
  randomCardPairs = randomIndexPairs.map(val => referenceArray[val]);

  return randomCardPairs;

}

function shuffleArray(array: number[]) {
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