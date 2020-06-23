import * as React from 'react';
import { useEffect, useState } from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import './InfoTable.sass';
import '../Link/Link.sass';
import '../Commiter/Commiter.sass';

import { loadFiles, InfoTableItemRequestThunkAction } from '../../store/actions/filesActions';

import { InfoTableRow } from './InfoTableRow';
import { InfoTableUrlParams, InfoTableItemType } from './InfoTableTypes';
import { AppState } from '../../store/reducers/root';

export const IT = cn('InfoTable');

export default function InfoTable() {
  const urlParams = useParams();
  const { repositoryId, hash, path } = urlParams as InfoTableUrlParams;
  const [tableState, setTableState] = useState('ready');
  const infoTableItems = useSelector((state: AppState) => {
    const res = state.infoTableItems || [];
    if (repositoryId !== undefined && res.length > 0 && res[0].name !== '../') {
      res.splice(0, 0, {
        name: '../',
        type: InfoTableItemType.PARENT
      });
    }
    return res;
  }, shallowEqual);

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<InfoTableItemRequestThunkAction>>>();
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
          <InfoTableRow item={item} key={`${repositoryId || ''}_${hash || ''}_${path || ''}_${item.name}`} />
        ))}
    </div>
  );
}
