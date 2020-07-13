import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './BranchSelector.sass';
import { URLParams } from 'src/interfaces/URLParams';

const fetchBranches = async (repositoryId: string | undefined): Promise<string[]> => {
  if (!repositoryId) {
    return [];
  }

  const response = await fetch(`/api/branches/${repositoryId}`);
  return response.json();
};

const BranchSelector = (): React.ReactElement => {
  const [branches, setBranches] = useState<string[]>([]);
  const { repositoryId, hash }: URLParams = useParams();
  return (
    // TODO добавить фильтр веток по имени
    <DropdownButton
      id='branchSelector'
      className='BranchSelector'
      title={hash || 'master'}
      onClick={async () => {
        setBranches([]);
        setBranches(await fetchBranches(repositoryId));
      }}
    >
      {branches.map(item => (
        // TODO добавить ссылки на которые будет переходить приложение при нажатии на элемент списка
        <Dropdown.Item key={item}>{item}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default BranchSelector;
