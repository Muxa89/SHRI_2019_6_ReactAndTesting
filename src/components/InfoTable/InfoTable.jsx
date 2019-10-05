import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import './InfoTable.sass';
import '../Link/Link.sass';
import '../Commiter/Commiter.sass';

import { loadFiles } from '../../store/actions/filesActions';

import InfoTableRow from './InfoTableRow';

export const IT = cn('InfoTable');

export default function InfoTable() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const { repositoryId, hash, path } = params;
    dispatch(loadFiles(repositoryId, hash, path));
  }, [params]);

  const infoTableItems = useSelector(state => state.infoTableItems);
  if (params.repositoryId !== undefined) {
    infoTableItems.splice(0, 0, {
      name: '../',
      type: 'folder'
    });
  }

  return (
    <div className={IT()}>
      <div className={IT('Header')}>
        <div className={IT('Name')}>Name</div>
        <div className={IT('Commit')}>Last commit</div>
        <div className={IT('Message')}>Commit message</div>
        <div className={IT('Commiter')}>Commiter</div>
        <div className={IT('Date')}>Updated</div>
      </div>
      {infoTableItems.map(item => (
        <InfoTableRow item={item} key={`${item.name}_${item.commit}`} />
      ))}
    </div>
  );
}
