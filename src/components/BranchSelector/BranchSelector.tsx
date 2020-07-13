import * as React from 'react';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './BranchSelector.sass';
import { URLParams } from 'src/interfaces/URLParams';

const BranchSelector = (): React.ReactElement => {
  // TODO добавить получение списка веток с сервера
  const items = ['branch1', 'branch2', 'branch3'];
  const { hash }: URLParams = useParams();
  return (
    // TODO добавить фильтр веток по имени
    <DropdownButton id='branchSelector' className='BranchSelector' title={hash || 'master'}>
      {items.map(item => (
        // TODO добавить ссылки на которые будет переходить приложение при нажатии на элемент списка
        <Dropdown.Item key={item}>{item}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default BranchSelector;
