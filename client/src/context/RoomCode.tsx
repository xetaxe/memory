import { createContext, ReactNode, useState } from "react"

const RoomCodeContext = createContext<{roomCode: string, setRoomCode: React.Dispatch<React.SetStateAction<string>>} | null>(null);

type RoomCodeContextProviderProps = {
	children? : ReactNode
}

const RoomCodeContextProvider: React.FC<RoomCodeContextProviderProps> = ({children}) => {

	const [roomCode, setRoomCode] = useState<string>("");
	const RoomCodeContextValue = {roomCode, setRoomCode}

	return(
		<RoomCodeContext.Provider value={RoomCodeContextValue}>
			{children}
		</RoomCodeContext.Provider>
		
	);
}

export {RoomCodeContext, RoomCodeContextProvider}