import * as React from 'react';
import './ItemAndBranchContainer.sass';
import '../Selector/Selector.sass';
import SelectedItem from 'src/components/SelectedItem/SelectedItem';
import BranchSelector from 'src/components/BranchSelector/BranchSelector';

const ItemAndBranchContainer = (): React.ReactElement => (
  <div className='ItemAndBranchContainer'>
    <SelectedItem />
    <BranchSelector />
  </div>
);
export default ItemAndBranchContainer;
