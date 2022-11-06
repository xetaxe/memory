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
  gameScores: PlayerScore[]
}

type EndMenuProps = {
  gameScores: PlayerScore[]
}



function Card({cardId, cardContent, cardReveal, onClickedCard}: CardProps) {
  const cardShowContent = (cardReveal === cardShow[0] ? "" : cardContent);
  return (
    <div className="card" onClick={() => onClickedCard(cardId)}>
      <div className="cardcontent">
        {cardShowContent}
      </div>
    </div>
  )
}


function PauseMenu({gameScores}: PauseMenuProps) {

  const useGameContext: IGameStatusContext = useContext(GameStatusContext);

  return (
    <div className={`pausemenu ${useGameContext.gameStatus !== "pause" ? "hide" : ""}`}>
      <div className="pausemenu__scores">Scores: 
        <ul className="pausemenu__scoreslist">
          {gameScores.map(player => <li className="pausemenu__scoresitem">{player.name}: {player.score}</li>)}
        </ul>
      </div>
      <button className="pausemenu__resumebutton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("play") : ""}>Resume Game</button>
    </div>
  )
}

function RestartMenu() {
  const useGameContext: IGameStatusContext = useContext(GameStatusContext);
  return (
    <div className={`restartmenu ${useGameContext.gameStatus !== "restart" ? "hide" : ""}`}>
      <div className="restartmenu__title">Are you sure you want to restart the game?</div>
      <button className="restartmenu__resumebutton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("play") : ""}>Resume Game</button>
      <button className="restartmenu__restartbutton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("define") : ""}>Restart Game</button>
    </div>
  )
}


function EndMenu({gameScores}: EndMenuProps) {
  
  const useGameContext: IGameStatusContext = useContext(GameStatusContext);

  return (
    <div className={`endmenu ${useGameContext.gameStatus !== "end" ? "hide" : ""}`}>
      <div className="endmenu__scores">Scores: 
        <ul className="endmenu__scoreslist">
          {gameScores.map(player => <li className="endmenu__scoresitem">{player.name}: {player.score}</li>)}
        </ul>
      </div>
      <button className="endmenu__restartbutton" onClick={e => useGameContext.setGameStatus != undefined ? useGameContext.setGameStatus("define") : ""}>Restart Game</button>
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
    <>
      <div className={`gamearea 
                    ${useGameContext.gameStatus !== "play" ? "blur" : ""}
                    ${useGameContext.gameStatus === "define" ? "hide" : ""}`}>
        <div className="cardsarea">
          {cards}
        </div>
        <div className="infoarea">
          <h1 className="infoarea__webtitle--reduced"> EPIC MEMOJY </h1>
          <div className="infoarea__turn">It is {players.map(player => (player.id === (turn + 1) ? <span>{player.name}</span> : ""))} turn!</div>
          <div className="infoarea__scores">Scores: 
            <ul className="infoarea__scoreslist">
              {gameScores.map(player => <li className="infoarea__listitem">{player.name}: {player.score}</li>)}
            </ul>
          </div>
          <div className="infoarea__buttons">
            <button className="infoarea__pausegame" onClick={e => useGameContext.setGameStatus !== undefined ? useGameContext.setGameStatus("pause") : ""}><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M28.25 38V10H36v28ZM12 38V10h7.75v28Z"/></svg></button>
            <button className="infoarea__restartgame" onClick={e => useGameContext.setGameStatus !== undefined ? useGameContext.setGameStatus("restart") : ""}><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 40q-6.65 0-11.325-4.675Q8 30.65 8 24q0-6.65 4.675-11.325Q17.35 8 24 8q4.25 0 7.45 1.725T37 14.45V8h3v12.7H27.3v-3h8.4q-1.9-3-4.85-4.85Q27.9 11 24 11q-5.45 0-9.225 3.775Q11 18.55 11 24q0 5.45 3.775 9.225Q18.55 37 24 37q4.15 0 7.6-2.375 3.45-2.375 4.8-6.275h3.1q-1.45 5.25-5.75 8.45Q29.45 40 24 40Z"/></svg></button>
          </div>
        </div>
      </div>
      <PauseMenu gameScores={gameScores}></PauseMenu>
      <EndMenu gameScores={gameScores}></EndMenu>
      <RestartMenu></RestartMenu>
    </>
  );
}



//////// Return random emoji pairs logic
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