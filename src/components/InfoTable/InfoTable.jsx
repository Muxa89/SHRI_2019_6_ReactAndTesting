import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import './InfoTable.sass';
import '../Link/Link.sass';
import '../Commiter/Commiter.sass';

import { loadFiles } from '../../store/actions/filesActions';

import InfoTableRow from './InfoTableRow';

export const IT = cn('InfoTable');

export default function InfoTable() {
  const urlParams = useParams();
  const { repositoryId, hash, path } = urlParams;
  const [tableState, setTableState] = useState('ready');
  const infoTableItems = useSelector(state => {
    const res = state.infoTableItems || [];
    if (repositoryId !== undefined && res.length > 0 && res[0].name !== '../') {
      res.splice(0, 0, {
        name: '../',
        type: 'folder'
      });
    }
    return res;
  }, shallowEqual);

  const dispatch = useDispatch();
  useEffect(() => {
    if (tableState === 'ready') {
      setTableState('loading');
      dispatch(loadFiles(repositoryId, hash, path)).then(() => {
        setTableState('ready');
      });
    }
  }, [urlParams, infoTableItems]);

  return (
    <div className={IT()}>
      <div className={IT('Header')}>
        <div className={IT('Name')}>Name</div>
        <div className={IT('Commit')}>Last commit</div>
        <div className={IT('Message')}>Commit message</div>
        <div className={IT('Commiter')}>Commiter</div>
        <div className={IT('Date')}>Updated</div>
      </div>
      {tableState === 'ready' &&
        infoTableItems.map(item => (
          <InfoTableRow
            item={item}
            key={`${repositoryId || ''}_${hash || ''}_${path || ''}_${
              item.name
            }`}
          />
        ))}
    </div>
  );
}
