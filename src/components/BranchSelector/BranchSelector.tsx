import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dropdown, DropdownButton as BootstrapDropdownButton } from 'react-bootstrap';
import 'src/components/BranchSelector/BranchSelector.sass';
import { getHref } from 'src/util/getHref';
import IURLParams from 'src/interfaces/IURLParams';
import fetchBranchesRequest from 'src/components/BranchSelector/fetchBranchesRequest';
import { displayNotification } from 'src/util/notificationService';
import { NotificationType } from 'src/util/notificationService';
import DropdownFilterWrapper from 'src/components/DropdownFilterWrapper/DropdownFilterWrapper';
import { ReactElement } from 'react';

const fetchBranches = async (repositoryId: string): Promise<string[]> => {
  try {
    return await fetchBranchesRequest(repositoryId);
  } catch (err) {
    displayNotification(`An error occurred while fetching for branches in project: ${err}`, NotificationType.ERROR);
    return [];
  }
};

const DropdownItem = ({ children: branch }: { children: string }): React.ReactElement => {
  const { repositoryId, hash, mode, path }: IURLParams = useParams();
  return (
    <Dropdown.Item active={branch === hash} href={getHref({ repositoryId, mode, hash: branch, path })}>
      {branch}
    </Dropdown.Item>
  );
};

const loadBranches = (
  setSpinnerVisible: React.Dispatch<boolean>,
  setBranches: React.Dispatch<string[]>,
  repositoryId: string
) => async (isOpen: boolean) => {
  if (isOpen) {
    setBranches([]);
    setSpinnerVisible(true);
    setBranches(await fetchBranches(repositoryId));
    setSpinnerVisible(false);
  }
};

function DropdownButton({
  title,
  onClick,
  children
}: {
  title: string;
  onClick: (isOpen: boolean) => Promise<void>;
  children: ReactElement;
}) {
  return (
    <BootstrapDropdownButton title={title} onToggle={onClick} id='BranchSelector' className='BranchSelector'>
      {children}
    </BootstrapDropdownButton>
  );
}

const BranchSelector = (): React.ReactElement | null => {
  const { repositoryId, hash }: IURLParams = useParams();
  if (!repositoryId || !hash) {
    return null;
  }

  const [branches, setBranches] = useState<string[]>([]);
  const [isSpinnerVisible, setSpinnerVisible] = useState<boolean>(false);

  return (
    <DropdownButton title={hash} onClick={loadBranches(setSpinnerVisible, setBranches, repositoryId)}>
      <DropdownFilterWrapper placeholder={'Enter branch name...'} isSpinnerVisible={isSpinnerVisible}>
        {branches.map(branch => (
          <DropdownItem key={branch}>{branch}</DropdownItem>
        ))}
      </DropdownFilterWrapper>
    </DropdownButton>
  );
};

export default BranchSelector;
