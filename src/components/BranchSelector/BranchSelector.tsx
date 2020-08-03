import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'src/components/BranchSelector/BranchSelector.sass';
import { getHref } from 'src/util/getHref';
import IURLParams from 'src/interfaces/IURLParams';
import fetchBranchesRequest from 'src/components/BranchSelector/fetchBranchesRequest';
import { displayNotification } from 'src/util/notificationService';
import { NotificationType } from 'src/util/notificationService';
import DropdownFilterWrapper from 'src/components/DropdownFilterWrapper/DropdownFilterWrapper';

const fetchBranches = async (repositoryId: string): Promise<string[]> => {
  try {
    return await fetchBranchesRequest(repositoryId);
  } catch (err) {
    displayNotification(`An error occurred while fetching for branches in project: ${err}`, NotificationType.ERROR);
    return [];
  }
};

const DropdownBranchItem = ({ children }: { children: string }): React.ReactElement => {
  const { repositoryId, hash, mode, path }: IURLParams = useParams();
  return (
    <Dropdown.Item active={children === hash} href={getHref({ repositoryId, mode, hash: children, path })}>
      {children}
    </Dropdown.Item>
  );
};

const BranchSelector = (): React.ReactElement | null => {
  const [branches, setBranches] = useState<string[]>([]);
  const [isSpinnerVisible, setSpinnerVisible] = useState<boolean>(false);
  const { repositoryId, hash }: IURLParams = useParams();

  if (!repositoryId || !hash) {
    return null;
  }

  const onToggleHandler = async (isOpen: boolean) => {
    if (isOpen) {
      setBranches([]);
      setSpinnerVisible(true);
      setBranches(await fetchBranches(repositoryId));
      setSpinnerVisible(false);
    }
  };

  return (
    <DropdownButton title={hash} onToggle={onToggleHandler} id='BranchSelector' className='BranchSelector'>
      <DropdownFilterWrapper placeholder={'Enter branch name...'} isSpinnerVisible={isSpinnerVisible}>
        {branches.map(branch => (
          <DropdownBranchItem key={branch}>{branch}</DropdownBranchItem>
        ))}
      </DropdownFilterWrapper>
    </DropdownButton>
  );
};

export default BranchSelector;
