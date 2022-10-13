import React from 'react';
import { OptionsMenuProps} from '../ts/models/OptionsMenu.models';
import './OptionsMenu.scss';

 const OptionsMenu: React.FC<OptionsMenuProps> = ({NumCards, HandleNumCards}) => {

  return (
    <div className="OptionsMenu">
      <div>
        Choose the difficulty!
      </div>
      <input type="range" min="0" max="4" className="NumCardsRange" onInput={HandleNumCards}/>
    </div>
  );
}

export default OptionsMenu;