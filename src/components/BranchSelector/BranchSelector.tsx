import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './BranchSelector.sass';
import { URLParams } from 'src/interfaces/URLParams';
import { getHref } from 'src/util/getHref';

const fetchBranches = async (repositoryId: string | undefined): Promise<string[]> => {
  if (!repositoryId) {
    return [];
  }

  const response = await fetch(`/api/branches/${repositoryId}`);
  return response.json();
};

const BranchSelector = (): React.ReactElement => {
  const [branches, setBranches] = useState<string[]>([]);
  const { repositoryId, hash, path, mode }: URLParams = useParams();
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
        <Dropdown.Item key={item} href={getHref({ repositoryId, mode, hash: item, path })}>
          {item}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default BranchSelector;
