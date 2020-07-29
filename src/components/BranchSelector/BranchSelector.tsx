import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'src/components/BranchSelector/BranchSelector.sass';
import { getHref } from 'src/util/getHref';
import IURLParams from 'src/interfaces/IURLParams';
import { fetchBranchesRequest } from 'src/components/BranchSelector/requests';
import { displayNotification } from 'src/util/notificationService';
import { NotificationType } from 'src/util/notificationService';
import DropdownItemsWithFilter from 'src/components/DropdownItemsWithFilter/DropdownItemsWithFilter';

const fetchBranches = async (repositoryId: string): Promise<string[]> => {
  try {
    return await fetchBranchesRequest(repositoryId);
  } catch (err) {
    displayNotification(`An error occurred while fetching for branches in project: ${err}`, NotificationType.ERROR);
    return [];
  }
};

const BranchSelector = (): React.ReactElement | null => {
  const [branches, setBranches] = useState<string[]>([]);
  const [isSpinnerVisible, setSpinnerVisible] = useState<boolean>(false);
  const { repositoryId, hash, mode, path }: IURLParams = useParams();

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
      <DropdownItemsWithFilter isSpinnerVisible={isSpinnerVisible} filterPlaceholder={'Enter branch name...'}>
        {branches.map(branchName => (
          <Dropdown.Item
            key={branchName}
            active={branchName === hash}
            href={getHref({ repositoryId, mode, hash: branchName, path })}
          >
            {branchName}
          </Dropdown.Item>
        ))}
      </DropdownItemsWithFilter>
    </DropdownButton>
  );
};

export default BranchSelector;
