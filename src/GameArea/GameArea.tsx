import React, {useState, useEffect, useContext, useMemo, ReactElement} from 'react';
import './GameArea.scss';
import { GameStatusContext } from '../App';

const EMOJI_ARRAY: string[] = ["✌","😂","😝","😁","😱","🙌","🍻","🔥","🌈","🌹","😡","🐶","🐬", "👀","🚗","🍎","💝","👌","😍","😉","😓","😳","💪","💩","🎉","🌺","👠","⚾","🏆","👽","💀","🐵","🐮","🐎","💣","👃","🍓","👊","💋","😘","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🐰","🐍","🐫","🚲","🍉"]
const cardShow: string[] = ["hidden", "clicked", "reveal"];


function Card({cardId, cardContent, cardReveal, cardPattern, onClickedCard}: CardProps) {
  return (
    <div className="card" onClick={() => onClickedCard(cardId)}>
      <div className={`card__inner  ${cardReveal === cardShow[1] || cardReveal === cardShow[2] ? "card__flipcard" : ""}`}>
        <div className="card__front" style={{backgroundImage: "url(/img/card_pattern"+cardPattern+".png)"}}>
        </div>
        <div className="card__back">
          {cardContent}
        </div>
      </div>
    </div>
  )
}


function PauseMenu({gameScores}: PauseMenuProps) {

  const useGameContext = useContext(GameStatusContext);

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


function EndMenu({gameScores}: EndMenuProps) {
  
  const useGameContext = useContext(GameStatusContext);
  const orderedPlayers: Player[] = gameScores.slice();
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


////////////////// WHOLE GAME AREA /////////////////////


export default function GameArea({numCards, players}: GameAreaProps) {

  const useGameContext = useContext(GameStatusContext);

  const [cardPattern, setCardPattern] = useState<number>(1);
  const [cardsState, setCardsState] = useState<Card[]>([]);
  const [gameScores, setGameScores] = useState<Player[]>(players);
  const [turn, setTurn] = useState<number>(0);

  useEffect(() => {
    if(useGameContext.gameStatus !== "define")
      return undefined;
    const fillCardsState: string[] = RandomCardPairs(EMOJI_ARRAY, Math.min(numCards, EMOJI_ARRAY.length));
    setCardsState(fillCardsState.map((val, index) => ({cardId:index, cardContent: val, cardReveal: cardShow[0]})));
  }, [numCards, useGameContext.gameStatus]);

  //Reset scores between games
  useEffect(() => {
    if(useGameContext.gameStatus !== "define") return undefined;
    const fillGameScores: Player[] = players.map((player) => ({...player, score: 0}));
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
    const foundCards: Card[] = [];
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
              // if (card.cardId === foundCards[0].cardId || card.cardId === foundCards[1].cardId) {
              if (card.cardReveal !== cardShow[2] ) {
                return {...card, cardReveal: cardShow[0]};
              }
              return card;
            }),
          );
          setTurn(prev => ((prev + 1) % players.length))
        }
      }, 1000)
    } else if (foundCards.length > 2){
      setTimeout( () => {
        setCardsState(current =>
          current.map(card => {
            if (card.cardReveal !== cardShow[2] ) {
              return {...card, cardReveal: cardShow[0]};
            }
            return card;
          })
        )}, 500)
    }
  }, [cardsState]);


  const onClickedCard = (cardId: number) => {
    const firstClick: Card | undefined = cardsState.find(card => {if (card.cardReveal === cardShow[1]) return card});
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
    const findSameCard: Card | undefined = cardsState.find(card => {if (card.cardId !== cardId && card.cardReveal === cardShow[1]) return card})
    setCardsState(current =>
      current.map(card => {
        if (card.cardId === cardId) {
          return {...card, cardReveal: 'clicked'};
        }
        return card;
      })
    );
  };

  const changeCardPattern = (newCardPatter: number) => {
    setCardPattern(newCardPatter);
  }

  let cards: ReactElement[] = cardsState.map(card => ( <Card {...card} cardPattern={cardPattern} onClickedCard={onClickedCard}/>));

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
          <div className="infoarea__scores">
            <div className="infoarea__scorestitle">Scores:</div>  
            <ul className="infoarea__scoreslist">
              {gameScores.map(player => <li className="infoarea__listitem">{player.name}: {player.score}</li>)}
            </ul>
          </div>
          <div className="infoarea__buttons">
            <button className="infoarea__pausegame" onClick={e => useGameContext.setGameStatus !== undefined ? useGameContext.setGameStatus("pause") : ""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M28.25 38V10H36v28ZM12 38V10h7.75v28Z"/></svg></button>
            <button className="infoarea__restartgame" onClick={e => useGameContext.setGameStatus !== undefined ? useGameContext.setGameStatus("restart") : ""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M24 40q-6.65 0-11.325-4.675Q8 30.65 8 24q0-6.65 4.675-11.325Q17.35 8 24 8q4.25 0 7.45 1.725T37 14.45V8h3v12.7H27.3v-3h8.4q-1.9-3-4.85-4.85Q27.9 11 24 11q-5.45 0-9.225 3.775Q11 18.55 11 24q0 5.45 3.775 9.225Q18.55 37 24 37q4.15 0 7.6-2.375 3.45-2.375 4.8-6.275h3.1q-1.45 5.25-5.75 8.45Q29.45 40 24 40Z"/></svg></button>
            <button className="infoarea__settings" onClick={e => useGameContext.setGameStatus !== undefined ? useGameContext.setGameStatus("settings") : ""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="m19.4 44-1-6.3q-.95-.35-2-.95t-1.85-1.25l-5.9 2.7L4 30l5.4-3.95q-.1-.45-.125-1.025Q9.25 24.45 9.25 24q0-.45.025-1.025T9.4 21.95L4 18l4.65-8.2 5.9 2.7q.8-.65 1.85-1.25t2-.9l1-6.35h9.2l1 6.3q.95.35 2.025.925Q32.7 11.8 33.45 12.5l5.9-2.7L44 18l-5.4 3.85q.1.5.125 1.075.025.575.025 1.075t-.025 1.05q-.025.55-.125 1.05L44 30l-4.65 8.2-5.9-2.7q-.8.65-1.825 1.275-1.025.625-2.025.925l-1 6.3ZM24 30.5q2.7 0 4.6-1.9 1.9-1.9 1.9-4.6 0-2.7-1.9-4.6-1.9-1.9-4.6-1.9-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6 0 2.7 1.9 4.6 1.9 1.9 4.6 1.9Zm0-3q-1.45 0-2.475-1.025Q20.5 25.45 20.5 24q0-1.45 1.025-2.475Q22.55 20.5 24 20.5q1.45 0 2.475 1.025Q27.5 22.55 27.5 24q0 1.45-1.025 2.475Q25.45 27.5 24 27.5Zm0-3.5Zm-2.2 17h4.4l.7-5.6q1.65-.4 3.125-1.25T32.7 32.1l5.3 2.3 2-3.6-4.7-3.45q.2-.85.325-1.675.125-.825.125-1.675 0-.85-.1-1.675-.1-.825-.35-1.675L40 17.2l-2-3.6-5.3 2.3q-1.15-1.3-2.6-2.175-1.45-.875-3.2-1.125L26.2 7h-4.4l-.7 5.6q-1.7.35-3.175 1.2-1.475.85-2.625 2.1L10 13.6l-2 3.6 4.7 3.45q-.2.85-.325 1.675-.125.825-.125 1.675 0 .85.125 1.675.125.825.325 1.675L8 30.8l2 3.6 5.3-2.3q1.2 1.2 2.675 2.05Q19.45 35 21.1 35.4Z"/></svg></button>
          </div>
        </div>
      </div>
      <PauseMenu gameScores={gameScores}></PauseMenu>
      <EndMenu gameScores={gameScores}></EndMenu>
      <RestartMenu></RestartMenu>
      <SettingsMenu cardPattern={cardPattern} changeCardPattern={changeCardPattern}></SettingsMenu>
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