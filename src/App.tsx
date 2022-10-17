import React, {useEffect, useState} from 'react';
import OptionsMenu from './OptionsMenu';


const difficultyArray: { level: number, numCards: number }[] = [
  {"level": 1, "numCards": 16}, 
  {"level": 2, "numCards": 25}, 
  {"level": 3, "numCards": 36}, 
  {"level": 4, "numCards": 49}, 
  {"level": 5, "numCards": 64},
];

let App: React.FC = () => {

  const [difficulty, setDifficulty] = useState(difficultyArray[0]);

  return (
    <div className="App">
      <OptionsMenu difficulty={difficulty} difficultyArray={difficultyArray} onChange={difOpt => setDifficulty(difOpt)}/>
    </div>
  );
}

export default App;