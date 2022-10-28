import React, {useState, useEffect, useContext, useMemo, ReactElement} from 'react';
import './GameArea.scss';
import { GameStatusContext, IGameStatusContext } from "../App";

const EMOJI_ARRAY: string[] = ["✌","😂","😝","😁","😱","🙌","🍻","🔥","🌈","🌹","😡","🐶","🐬", "👀","🚗","🍎","💝","👌","😍","😉","😓","😳","💪","💩","🎉","🌺","👠","⚾","🏆","👽","💀","🐵","🐮","🐎","💣","👃","🍓","👊","💋","😘","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🐰","🐍","🐫","🚲","🍉"]

const cardShow: string[] = ["hidden", "clicked", "reveal"];

type CardProps = {
  cardId: number,
  cardContent: string,
  cardReveal: string,
  onClickedCard: (cardId: number) => void
}

type PauseMenuProps = {
  test: string
}

type EndMenuProps = {
  test: string
}



function Card({cardId, cardContent, cardReveal, onClickedCard}: CardProps) {
  const cardShowContent = (cardReveal === cardShow[0] ? "" : cardContent);
  return (
    <div className="Card" onClick={() => onClickedCard(cardId)}>
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

type Player = { 
  id: number, 
  name: string
}

type GameAreaProps = {
  numCards: number,
  players: Player[]
}

type CardState = {
  cardId: number,
  cardContent: string,
  cardReveal: string
}

type PlayerScore = {
  id: number,
  name: string,
  score: number
}

export default function GameArea({numCards, players}: GameAreaProps) {

  const useGameContext: IGameStatusContext = useContext(GameStatusContext);

  const [cardsState, setCardsState] = useState<CardState[]>([]);
  const [gameScores, setGameScores] = useState<PlayerScore[]>([]);
  const [turn, setTurn] = useState<number>(0);

  useEffect(() => {
    if(useGameContext.gameStatus !== "define") return undefined;
    const fillCardsState: string[] = RandomCardPairs(EMOJI_ARRAY, numCards);
    setCardsState(fillCardsState.map((val, index) => ({cardId:index, cardContent: val, cardReveal: cardShow[0]})));
  }, [numCards, useGameContext.gameStatus]);

  useEffect(() => {
    if(useGameContext.gameStatus !== "define") return undefined;
    const fillGameScores: PlayerScore[] = players.map((player) => ({...player, score: 0}));
    setGameScores(fillGameScores);
  }, [players, useGameContext.gameStatus]);

  //Game ended?
  useEffect(() => {
    let totalCardsRevealed: number = 0;
    for(let i=0; i<gameScores.length; i++){
      totalCardsRevealed += gameScores[i].score;
    }
    //YES
    if (totalCardsRevealed === (numCards / 2)) {
      if (useGameContext.setGameStatus != undefined) 
      useGameContext.setGameStatus("end");
    }
  }, [gameScores])

  //Update clicked cards
  useEffect(() => {
    const foundCards: CardState[] = [];
    for (let i=0; i<cardsState.length; i++){
      if (cardsState[i].cardReveal === cardShow[1]) 
        foundCards.push(cardsState[i]);
    }
    console.log(foundCards);
    if (foundCards.length === 2){
      setTimeout( () => {
        if (foundCards[0].cardContent === foundCards[1].cardContent){
          setCardsState(current =>
            current.map(card => {
              if (card.cardId === foundCards[0].cardId || card.cardId === foundCards[1].cardId) {
                return {...card, cardReveal: cardShow[2]};
              }
              return card;
            }),
          );
          setGameScores(current =>
            current.map(player => {
              if (player.id === (turn + 1)) {
                return {...player, score: player.score++};
              }
              return player;
            }),
          );
        } else {
          setCardsState(current =>
            current.map(card => {
              if (card.cardId === foundCards[0].cardId || card.cardId === foundCards[1].cardId) {
                return {...card, cardReveal: cardShow[0]};
              }
              return card;
            }),
          );
          setTurn(prev => ((prev + 1) % players.length))
        }
      }, 1000)
    }
  }, [cardsState]);


  const onClickedCard = (cardId: number) => {
    const firstClick: CardState | undefined = cardsState.find(card => {if (card.cardReveal === cardShow[1]) return card});
    if (firstClick === undefined){
      setCardsState(current =>
        current.map(card => {
          if (card.cardId === cardId) {
            return {...card, cardReveal: 'clicked'};
          }
          return card;
        }),
      );
    }
    const findSameCard: CardState | undefined = cardsState.find(card => {if (card.cardId !== cardId && card.cardReveal === cardShow[1]) return card})
    setCardsState(current =>
      current.map(card => {
        if (card.cardId === cardId) {
          return {...card, cardReveal: 'clicked'};
        }
        return card;
      })
    );
  };

  let cards: ReactElement[] = cardsState.map(card => ( <Card {...card} onClickedCard={onClickedCard}/>));

  return (
    <div className={`GameArea 
                  ${useGameContext.gameStatus === "define" ? "hide" : ""}`}>
      <div className={`CardsArea 
                  ${useGameContext.gameStatus === "pause" ? "blur" : ""}
                  ${useGameContext.gameStatus === "end" ? "blur" : ""}`}>
        {cards}
      </div>
      <button className="PauseGameButton" onClick={e => useGameContext.setGameStatus !== undefined ? useGameContext.setGameStatus("pause") : ""}>Pause Game</button>
      {/* <button className="EndGameButton" onClick={e => useGameContext.setGameStatus !== undefined ? useGameContext.setGameStatus("end") : ""}>End Game</button> */}
      <PauseMenu test="test"></PauseMenu>
      <EndMenu test="test"></EndMenu>
      <div>It is {players.map(player => (player.id === (turn + 1) ? <span>{player.name}</span> : ""))} turn!</div>
      <div>Scores: 
        <ul>
          {gameScores.map(player => <li>{player.name}: {player.score}</li>)}
        </ul>
      </div>
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