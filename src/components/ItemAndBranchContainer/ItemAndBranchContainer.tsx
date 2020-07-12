import * as React from 'react';

import './ItemAndBranchContainer.sass';
import '../Selector/Selector.sass';
import SelectedItem from 'src/components/SelectedItem/SelectedItem';

const ItemAndBranchContainer = (): React.ReactElement => (
  <div className='ItemAndBranchContainer'>
    <SelectedItem />
    <div className='BranchSelector Selector'>
      trunk <div className='Selector-ArrowDown' />
    </div>
  </div>
);
export default ItemAndBranchContainer;
