import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dropdown, DropdownButton, Spinner, Form } from 'react-bootstrap';
import 'src/components/BranchSelector/BranchSelector.sass';
import { getHref } from 'src/util/getHref';
import { includes } from 'lodash';
import IURLParams from 'src/interfaces/IURLParams';
import { fetchBranchesRequest } from 'src/components/BranchSelector/requests';
import { displayNotification } from 'src/util/notificationService';
import { NotificationType } from 'src/util/notificationService';

const fetchBranches = async (repositoryId: string): Promise<string[]> => {
  try {
    return fetchBranchesRequest(repositoryId);
  } catch (err) {
    displayNotification(`An error occurred while fetching for branches in project: ${err}`, NotificationType.ERROR);
    return [];
  }
};

const NameFilter = ({
  filter,
  setFilter
}: {
  filter: string;
  setFilter: (filter: string) => void;
}): React.ReactElement => (
  <Form.Control
    autoFocus
    value={filter}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
    placeholder={'Enter branch name...'}
  />
);

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
      <NameFilter filter={nameFilter} setFilter={setNameFilter} />
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

const BranchSelector = (): React.ReactElement | null => {
  const [branches, setBranches] = useState<string[]>([]);
  const [isSpinnerVisible, setSpinnerVisible] = useState<boolean>(false);
  const { repositoryId, hash }: IURLParams = useParams();

  if (!repositoryId || !hash) {
    return null;
  }

  return (
    <DropdownButton
      id='BranchSelector'
      className='BranchSelector'
      title={hash}
      onToggle={async (isOpen: boolean) => {
        if (isOpen) {
          setBranches([]);
          setSpinnerVisible(true);
          setBranches(await fetchBranches(repositoryId));
          setSpinnerVisible(false);
        }
      }}
    >
      <DropdownItems isSpinnerVisible={isSpinnerVisible} branches={branches} />
    </DropdownButton>
  );
};

export default BranchSelector;
