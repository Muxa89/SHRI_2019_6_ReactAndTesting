import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Spinner from 'react-bootstrap/Spinner';
import 'src/components/BranchSelector/BranchSelector.sass';
import { getHref } from 'src/util/getHref';
import { includes } from 'lodash';
import Form from 'react-bootstrap/Form';
import IURLParams from 'src/interfaces/IURLParams';
import { api } from 'src/util/api';

const fetchBranches = async (repositoryId: string | undefined): Promise<string[]> => {
  if (!repositoryId) {
    return [];
  }

  const response = await fetch(api.branches.withParams({ repository: repositoryId }));
  return response.json();
};

const BranchNameFilter = ({
  filter,
  setFilter
}: {
  filter: string;
  setFilter: (filter: string) => void;
}): React.ReactElement => (
  <Form.Control
    autoFocus
    value={filter}
    onChange={e => setFilter(e.target.value)}
    placeholder={'Enter branch name...'}
  />
);

const onToggleHandler = (
  repositoryId: string | undefined,
  setBranches: (branches: string[]) => void,
  setSpinnerVisible: (isVisible: boolean) => void
) => async (isOpen: boolean) => {
  if (isOpen) {
    setBranches([]);
    setSpinnerVisible(true);
    setBranches(await fetchBranches(repositoryId));
    setSpinnerVisible(false);
  }
};

const DropdownItems = ({
  branches,
  isSpinnerVisible
}: {
  branches: string[];
  isSpinnerVisible: boolean;
}): React.ReactElement => {
  if (isSpinnerVisible) {
    return <Spinner animation='border' />;
  }

  const [nameFilter, setNameFilter] = useState<string>('');
  const { repositoryId, mode, hash, path }: IURLParams = useParams();
  return (
    <>
      <BranchNameFilter filter={nameFilter} setFilter={setNameFilter} />
      <Dropdown.Divider />
      {branches
        .filter(branchName => includes(branchName.toLowerCase(), nameFilter.toLowerCase()))
        .map(branchName => (
          <Dropdown.Item
            key={branchName}
            active={branchName === hash}
            href={getHref({ repositoryId, mode, hash: branchName, path })}
          >
            {branchName}
          </Dropdown.Item>
        ))}
    </>
  );
};

const BranchSelector = (): React.ReactElement => {
  const [branches, setBranches] = useState<string[]>([]);
  const [isSpinnerVisible, setSpinnerVisible] = useState<boolean>(false);
  const { repositoryId, hash }: IURLParams = useParams();

  // TODO fetch default branch name if no hash provided in URL
  return (
    <DropdownButton
      id='BranchSelector'
      className='BranchSelector'
      title={hash || 'master'}
      onToggle={onToggleHandler(repositoryId, setBranches, setSpinnerVisible)}
    >
      <DropdownItems isSpinnerVisible={isSpinnerVisible} branches={branches} />
    </DropdownButton>
  );
};

export default BranchSelector;
