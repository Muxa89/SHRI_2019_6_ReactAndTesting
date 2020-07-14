import * as React from 'react';
import { useParams } from 'react-router-dom';
import IURLParams from 'src/interfaces/IURLParams';
import { last } from 'lodash';
import 'src/components/SelectedItem/SelectedItem.sass';

const getSelectedItemName = (): string => {
  const { repositoryId, path }: IURLParams = useParams();

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
