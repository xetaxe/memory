import { createContext, ReactNode, useState } from "react"

const GameModeContext = createContext<{gameMode: GameMode, setGameMode: React.Dispatch<React.SetStateAction<GameMode>>} | null>(null);

type GameModeContextProviderProps = {
	children? : ReactNode
}

const GameModeContextProvider: React.FC<GameModeContextProviderProps> = ({children}) => {

	const [gameMode, setGameMode] = useState<GameMode>("online");
	const GameModeContextValue = {gameMode, setGameMode}

	return(
		<GameModeContext.Provider value={GameModeContextValue}>
			{children}
		</GameModeContext.Provider>
		
	);
}

export {GameModeContext, GameModeContextProvider}