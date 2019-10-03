import React from 'react';

import './ItemAndBranchContainer.sass';
import '../Selector/Selector.sass';

export default function ItemAndBranchContainer() {
  return (
    <div class='ItemAndBranchContainer'>
      <div class='SelectedItem ItemAndBranchContainer-SelectedItem'>
        arcadia
      </div>
      <div class='BranchSelector Selector'>
        trunk <div class='Selector-ArrowDown'> </div>
      </div>
    </div>
  );
}
