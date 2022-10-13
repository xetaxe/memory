import React, {useEffect, useState} from 'react';
import './App.scss';
import OptionsMenu from './OptionsMenu';
import * as c from './ts/constants/constants';
import * as t from './ts/types/types';

 const App: React.FC = () => {

  const [numCards, setNumCards] = useState<number>(16);

  const handleNumCards = (numCards:number) => setNumCards(c.NUM_CARDS[numCards]);

  useEffect(() => {
    console.log(numCards);
  }, [numCards]);

  return (
    <div className="App">
      <OptionsMenu NumCards={numCards} HandleNumCards={handleNumCards}/>
    </div>
  );
}

export default App;