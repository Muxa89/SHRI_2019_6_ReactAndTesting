import * as React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './BranchSelector.sass';

const BranchSelector = (): React.ReactElement => {
  const items = ['branch1', 'branch2', 'branch3'];
  return (
    <DropdownButton id='branchSelector' className='BranchSelector' title='trunk'>
      {items.map(item => (
        <Dropdown.Item key={item}>{item}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default BranchSelector;
