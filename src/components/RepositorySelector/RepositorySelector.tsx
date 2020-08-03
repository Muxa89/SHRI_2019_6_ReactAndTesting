import * as React from 'react';
import { useState } from 'react';
import 'src/components/RepositorySelector/RepositorySelector.sass';
import IURLParams from 'src/interfaces/IURLParams';
import { useParams } from 'react-router-dom';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { getHref } from 'src/util/getHref';
import fetchRepositoriesRequest from 'src/components/RepositorySelector/fetchRepositoriesRequest';
import { displayNotification } from 'src/util/notificationService';
import { NotificationType } from 'src/util/notificationService';
import DropdownFilterWrapper from 'src/components/DropdownFilterWrapper/DropdownFilterWrapper';

const fetchRepositories = async (): Promise<string[]> => {
  try {
    return await fetchRepositoriesRequest();
  } catch (err) {
    displayNotification(`An error occurred while fetching for repositories in project: ${err}`, NotificationType.ERROR);
    return [];
  }
};

const DropdownRepositoryItem = ({ children }: { children: string }) => {
  const { repositoryId }: IURLParams = useParams();
  return (
    <Dropdown.Item active={children === repositoryId} href={getHref({ repositoryId: repositoryId, mode: 'tree' })}>
      {children}
    </Dropdown.Item>
  );
};

const DropdownRepositoryButton = ({
  onToggle,
  title,
  children
}: {
  title: string;
  onToggle: (isOpen: boolean) => Promise<void>;
  children: React.ReactElement;
}) => (
  <DropdownButton
    id='RepositorySelector-Button'
    className='RepositorySelector-Button'
    title={title}
    onToggle={onToggle}
    variant='secondary'
  >
    {children}
  </DropdownButton>
);

const RepositorySelector = (): React.ReactElement | null => {
  const { repositoryId }: IURLParams = useParams();
  if (!repositoryId) {
    return null;
  }

  const [repositories, setRepositories] = useState<string[]>([]);
  const [isSpinnerVisible, setSpinnerVisible] = useState<boolean>(false);

  const onToggleHandler = async (isOpen: boolean) => {
    if (isOpen) {
      setRepositories([]);
      setSpinnerVisible(true);
      setRepositories(await fetchRepositories());
      setSpinnerVisible(false);
    }
  };

  return (
    <div className='RepositorySelector'>
      <span className='RepositorySelector-RepositoryName'>Repository</span>
      <DropdownRepositoryButton title={repositoryId} onToggle={onToggleHandler}>
        <DropdownFilterWrapper placeholder='Enter repository name...' isSpinnerVisible={isSpinnerVisible}>
          {repositories.map(repository => (
            <DropdownRepositoryItem key={repository}>{repository}</DropdownRepositoryItem>
          ))}
        </DropdownFilterWrapper>
      </DropdownRepositoryButton>
    </div>
  );
};

export default RepositorySelector;
