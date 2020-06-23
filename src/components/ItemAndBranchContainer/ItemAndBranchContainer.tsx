import * as React from 'react';

import './ItemAndBranchContainer.sass';
import '../Selector/Selector.sass';

const ItemAndBranchContainer = (): React.ReactElement => (
  <div className='ItemAndBranchContainer'>
    <div className='SelectedItem ItemAndBranchContainer-SelectedItem'>arcadia</div>
    <div className='BranchSelector Selector'>
      trunk <div className='Selector-ArrowDown' />
    </div>
  </div>
);
export default ItemAndBranchContainer;
