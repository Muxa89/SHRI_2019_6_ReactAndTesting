import * as React from 'react';
import { useParams } from 'react-router-dom';
import { URLParams } from 'src/interfaces/URLParams';
import { last } from 'lodash';

const getSelectedItemName = (): string => {
  const { repositoryId, path }: URLParams = useParams();

  if (path) {
    const activeItem = last(path.split('/'));
    if (activeItem) {
      return activeItem;
    }
  }

  if (repositoryId) {
    return repositoryId;
  }

  return '';
};

const SelectedItem = (): React.ReactElement => (
  <div className='SelectedItem ItemAndBranchContainer-SelectedItem'>{getSelectedItemName()}</div>
);

export default SelectedItem;
