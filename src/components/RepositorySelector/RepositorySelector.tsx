import * as React from 'react';
import { useState } from 'react';
import 'src/components/Selector/Selector.sass';
import 'src/components/RepositorySelector/RepositorySelector.sass';
import IURLParams from 'src/interfaces/IURLParams';
import { useParams } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import { includes } from 'lodash';
import { getHref } from 'src/util/getHref';
import Form from 'react-bootstrap/Form';
import { api } from 'src/util/api';

const fetchRepositories = async (): Promise<string[]> => {
  const response = await fetch(api.repositories.withParams());
  return response.json();
};

const onToggleHandler = (
  repositoryId: string | undefined,
  setRepositories: (repositories: string[]) => void,
  setSpinnerVisible: (isVisible: boolean) => void
) => async (isOpen: boolean) => {
  if (isOpen) {
    setRepositories([]);
    setSpinnerVisible(true);
    setRepositories(await fetchRepositories());
    setSpinnerVisible(false);
  }
};

const RepositoryNameFilter = ({
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
    placeholder={'Enter repository name...'}
  />
);

const DropdownItems = ({
  repositories,
  isSpinnerVisible
}: {
  repositories: string[];
  isSpinnerVisible: boolean;
}): React.ReactElement => {
  if (isSpinnerVisible) {
    return <Spinner animation='border' />;
  }

  const [nameFilter, setNameFilter] = useState<string>('');
  const { repositoryId }: IURLParams = useParams();
  return (
    <>
      <RepositoryNameFilter filter={nameFilter} setFilter={setNameFilter} />
      <Dropdown.Divider />
      {repositories
        .filter(repositoryName => includes(repositoryName.toLowerCase(), nameFilter.toLowerCase()))
        .map(repositoryName => (
          <Dropdown.Item
            key={repositoryName}
            active={repositoryName === repositoryId}
            href={getHref({ repositoryId: repositoryName })}
          >
            {repositoryName}
          </Dropdown.Item>
        ))}
    </>
  );
};

const RepositorySelector = (): React.ReactElement => {
  const [repositories, setRepositories] = useState<string[]>([]);
  const [isSpinnerVisible, setSpinnerVisible] = useState<boolean>(false);
  const { repositoryId }: IURLParams = useParams();
  return (
    <div className='RepositorySelector Header-RepositorySelector Selector'>
      <span className='RepositorySelector-Repository'>Repository</span>
      <DropdownButton
        id='RepositorySelector-Button'
        className='RepositorySelector-Button'
        title={repositoryId}
        onToggle={onToggleHandler(repositoryId, setRepositories, setSpinnerVisible)}
        variant='secondary'
      >
        <DropdownItems isSpinnerVisible={isSpinnerVisible} repositories={repositories} />
      </DropdownButton>
    </div>
  );
};

export default RepositorySelector;
