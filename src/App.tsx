import React, {useEffect, useState, useMemo, createContext} from 'react';
import GameArea from './GameArea';
import OptionsMenu from './OptionsMenu';


const gameStatusArray: string[] = ["define", "play", "pause", "end", "restart"]

export interface IGameStatusContext {
  gameStatus?: string,
  setGameStatus?: (value: string) => void;
}

export const GameStatusContext = createContext<IGameStatusContext>({});


let App: React.FC = () => {

  const [level, setLevel] = useState({"level": 1, "numCards": 16});
  const [players, setPlayers] = useState([ {"id": 1, "name": "Player 1"}, {"id": 2, "name": "Player 2"}]);
  const [gameStatus, setGameStatus] = useState(gameStatusArray[0]);

  useEffect(() => {
    console.log("APP:");
  }, [players, level]);

  const optionsMenu =  useMemo(() => {
    return (
      <OptionsMenu 
        level={level}
        updateLevel={(levelUpdate: { level: number, numCards: number }) => setLevel(levelUpdate)}
        players={players}
        updatePlayers={(playersUpdate: { id: number, name: string }[]) => setPlayers(playersUpdate)}
      />
    );
  }, [level, players]);

  const gameArea = useMemo(() => {
    return (
      <GameArea
        numCards={level.numCards} 
        players={players}
      />
    )
  }, [level, players, gameStatus])

  const AppGameStatus: IGameStatusContext = {gameStatus, setGameStatus}

  return (
    <GameStatusContext.Provider value={AppGameStatus}>
      <h1 className={`webtitle ${gameStatus !== "define" ? "hide" : ""}`}> EPIC MEMOJY </h1>
      {optionsMenu}
      {gameArea}
    </GameStatusContext.Provider>
  );
}

export default App;