import * as React from 'react';
import { useState } from 'react';
import 'src/components/Selector/Selector.sass';
import 'src/components/RepositorySelector/RepositorySelector.sass';
import IURLParams from 'src/interfaces/IURLParams';
import { useParams } from 'react-router-dom';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { getHref } from 'src/util/getHref';
import { fetchRepositoriesRequest } from 'src/components/RepositorySelector/requests';
import { displayNotification } from 'src/util/notificationService';
import { NotificationType } from 'src/util/notificationService';
import DropdownItemsWithFilter from 'src/components/DropdownItemsWithFilter/DropdownItemsWithFilter';

const CLASS_NAME = 'RepositorySelector';

const fetchRepositories = async (): Promise<string[]> => {
  try {
    return fetchRepositoriesRequest();
  } catch (err) {
    displayNotification(`An error occurred while fetching for repositories in project: ${err}`, NotificationType.ERROR);
    return [];
  }
};

const RepositorySelector = (): React.ReactElement | null => {
  const { repositoryId }: IURLParams = useParams();
  if (!repositoryId) {
    return null;
  }

  const [repositories, setRepositories] = useState<string[]>([]);
  const [isSpinnerVisible, setSpinnerVisible] = useState<boolean>(false);

  return (
    <div className={CLASS_NAME}>
      <span className={`${CLASS_NAME}-RepositoryName`}>Repository</span>
      <DropdownButton
        id={`${CLASS_NAME}-Button`}
        className={`${CLASS_NAME}-Button`}
        title={repositoryId}
        onToggle={async (isOpen: boolean) => {
          if (isOpen) {
            setRepositories([]);
            setSpinnerVisible(true);
            setRepositories(await fetchRepositories());
            setSpinnerVisible(false);
          }
        }}
        variant='secondary'
      >
        <DropdownItemsWithFilter isSpinnerVisible={isSpinnerVisible} filterPlaceholder={'Enter repository name...'}>
          {repositories.map(repositoryName => (
            <Dropdown.Item
              key={repositoryName}
              active={repositoryName === repositoryId}
              href={getHref({ repositoryId, mode: 'tree' })}
            >
              {repositoryName}
            </Dropdown.Item>
          ))}
        </DropdownItemsWithFilter>
      </DropdownButton>
    </div>
  );
};

export default RepositorySelector;
