import * as React from 'react';
import { useState } from 'react';
import 'src/components/RepositorySelector/RepositorySelector.sass';
import IURLParams from 'src/interfaces/IURLParams';
import { useParams } from 'react-router-dom';
import { DropdownButton as BootstrapDropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { getHref } from 'src/util/getHref';
import fetchRepositoriesRequest from 'src/components/RepositorySelector/fetchRepositoriesRequest';
import { displayNotification } from 'src/util/notificationService';
import { NotificationType } from 'src/util/notificationService';
import DropdownFilter from 'src/components/DropdownFilter/DropdownFilter';
import { ViewMode } from 'src/interfaces/ViewMode';
import Spinner from 'src/components/Spinner/Spinner';

const fetchRepositories = async (): Promise<string[]> => {
  try {
    return await fetchRepositoriesRequest();
  } catch (err) {
    displayNotification(`An error occurred while fetching for repositories in project: ${err}`, NotificationType.ERROR);
    return [];
  }
};

const DropdownItem = ({ children: repository }: { children: string }) => {
  const { repositoryId: activeRepository }: IURLParams = useParams();
  return (
    <Dropdown.Item
      active={repository === activeRepository}
      href={getHref({ repositoryId: repository, mode: ViewMode.TREE })}
    >
      {repository}
    </Dropdown.Item>
  );
};

const DropdownButton = ({
  onClick,
  title,
  children
}: {
  title: string;
  onClick: (isOpen: boolean) => Promise<void>;
  children: React.ReactElement;
}) => (
  <BootstrapDropdownButton id='RepositorySelector-Button' title={title} onToggle={onClick} variant='secondary'>
    {children}
  </BootstrapDropdownButton>
);

const loadRepositories = (
  setSpinnerVisible: React.Dispatch<boolean>,
  setRepositories: React.Dispatch<string[]>
) => async (isOpen: boolean) => {
  if (isOpen) {
    setRepositories([]);
    setSpinnerVisible(true);
    setRepositories(await fetchRepositories());
    setSpinnerVisible(false);
  }
};

const Label = ({ children }: { children: string }) => (
  <span className='RepositorySelector-RepositoryNameLabel'>{children}</span>
);

const RepositorySelector = (): React.ReactElement | null => {
  const { repositoryId }: IURLParams = useParams();
  if (!repositoryId) {
    return null;
  }

  const [repositories, setRepositories] = useState<string[]>([]);
  const [isSpinnerVisible, setSpinnerVisible] = useState<boolean>(false);

  return (
    <div className='RepositorySelector'>
      <Label>Repository</Label>
      <DropdownButton title={repositoryId} onClick={loadRepositories(setSpinnerVisible, setRepositories)}>
        <Spinner isSpinnerVisible={isSpinnerVisible}>
          <DropdownFilter placeholder='Enter repository name...'>
            {repositories.map(repository => (
              <DropdownItem key={repository}>{repository}</DropdownItem>
            ))}
          </DropdownFilter>
        </Spinner>
      </DropdownButton>
    </div>
  );
};

export default RepositorySelector;
