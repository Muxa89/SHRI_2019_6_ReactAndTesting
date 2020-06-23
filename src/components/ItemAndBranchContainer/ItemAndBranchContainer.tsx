import * as React from 'react';

import './ItemAndBranchContainer.sass';
import '../Selector/Selector.sass';

export default function ItemAndBranchContainer() {
  return (
    <div className='ItemAndBranchContainer'>
      <div className='SelectedItem ItemAndBranchContainer-SelectedItem'>arcadia</div>
      <div className='BranchSelector Selector'>
        trunk <div className='Selector-ArrowDown'> </div>
      </div>
    </div>
  );
}
