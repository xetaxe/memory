type GameStatusContextProps = {
  gameStatus?: string,
  setGameStatus?: (value: string) => void;
}

type GameStatusContextProviderProps = {
	children?: ReactNode
}

type Player = {
  id: number,
  name: string,
  score: number
}

type OptionsMenuProps = {
  totalCards: number,
  updateTotalCards: (newTotalCards: number, incrementTotalCards: number) => void,
  players: Player[],
  updatePlayers: (value: Player[]) => void,
}

type GameAreaProps = {
  numCards: number,
  players: Player[]
}

type Card = {
  cardId: number,
  cardContent: string,
  cardReveal: string
}

type CardProps = {
  cardId: number,
  cardContent: string,
  cardReveal: string,
  cardPattern: number,
  onClickedCard: (cardId: number) => void
}

type PauseMenuProps = {
  gameScores: Player[]
}

type EndMenuProps = {
  gameScores: Player[]
}

type SettingsMenuProps = {
  cardPattern: number,
  changeCardPattern: (newCardPattern: number) => void
}