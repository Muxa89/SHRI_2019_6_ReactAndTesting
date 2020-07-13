import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './BranchSelector.sass';
import { URLParams } from 'src/interfaces/URLParams';
import { getHref } from 'src/util/getHref';
import { includes } from 'lodash';
import Form from 'react-bootstrap/Form';

const fetchBranches = async (repositoryId: string | undefined): Promise<string[]> => {
  if (!repositoryId) {
    return [];
  }

  const response = await fetch(`/api/branches/${repositoryId}`);
  return response.json();
};

interface BranchNameFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const BranchNameFilter = ({ filter, setFilter }: BranchNameFilterProps): React.ReactElement => (
  <Form.Control
    autoFocus
    value={filter}
    onChange={e => setFilter(e.target.value)}
    placeholder={'Enter branch name...'}
  />
);

const BranchSelector = (): React.ReactElement => {
  const [branches, setBranches] = useState<string[]>([]);
  const [branchNameFilter, setBranchNameFilter] = useState<string>('');
  const { repositoryId, hash, path, mode }: URLParams = useParams();

  // TODO fetch default branch name if no hash provided in URL
  return (
    <DropdownButton
      id='branchSelector'
      className='BranchSelector'
      title={hash || 'master'}
      onClick={async () => {
        setBranches([]);
        setBranches(await fetchBranches(repositoryId));
      }}
    >
      <BranchNameFilter filter={branchNameFilter} setFilter={setBranchNameFilter} />
      {branches
        .filter(branchName => includes(branchName, branchNameFilter))
        .map(branchName => (
          <Dropdown.Item
            key={branchName}
            active={branchName === hash}
            href={getHref({ repositoryId, mode, hash: branchName, path })}
          >
            {branchName}
          </Dropdown.Item>
        ))}
    </DropdownButton>
  );
};

export default BranchSelector;
