import React, {useState, useEffect, createContext, useRef} from 'react';
import io, { Manager, Socket } from 'socket.io-client';
import GameArea from './GameArea';
import OptionsMenu from './OptionsMenu';

const gameStatusArray: string[] = ["define", "play", "pause", "end", "restart", "settings"]

export const GameStatusContext = createContext<GameStatusContextProps>({});

const manager = new Manager("http://localhost:3000", {path: "/online", transports: ['websocket'], autoConnect: false});
const socket = manager.socket("");

const Online: React.FC = () => {

  const [roomId, setRoomId] = useState<string>("");

  const [totalCards, setTotalCards] = useState(16);
  const [players, setPlayers] = useState<Player[]>([ {"id": 1, "name": "Player 1", score: 0}, 
    {"id": 2, "name": "Player 2", score: 0}]);


  const [gameStatus, setGameStatus] = useState(gameStatusArray[0]);
  const GameStatus: GameStatusContextProps = {gameStatus, setGameStatus};

  const updateTotalCards = (newTotalCards: number, incrementTotalCards: number) => {
    if (incrementTotalCards === 0) 
      setTotalCards(newTotalCards)
    else 
      setTotalCards((prev) => prev + incrementTotalCards)
  }

  const updatePlayers = (updatedPlayersArray: Player[]) => setPlayers(updatedPlayersArray);


  useEffect( () => {

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);


  // Reset scores between games
  useEffect(() => {
    if (gameStatus === "define")
      updatePlayers(players.map((player) => ({...player, score: 0}))); 
  }, [gameStatus])

  return (
    <GameStatusContext.Provider value={GameStatus}>
      <h1 className={`webtitle ${gameStatus !== "define" ? "hide" : ""}`}> EPIC MEMOJY </h1>
      <OptionsMenu totalCards={totalCards} updateTotalCards={updateTotalCards}
        players={players} updatePlayers={updatePlayers}/>
      <GameArea numCards={totalCards} players={players} updatePlayers={updatePlayers}/>
    </GameStatusContext.Provider>
  );
}

export default Online;