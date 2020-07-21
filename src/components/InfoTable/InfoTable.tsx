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
import { InfoTableUrlParams, InfoTableItemType, InfoTableItem } from 'src/components/InfoTable/InfoTableTypes';
import { AppState } from '../../store/reducers/root';
import IURLParams from 'src/interfaces/IURLParams';
import { api } from '../../util/api';
import Table from 'react-bootstrap/Table';
import IFileInfo from 'src/interfaces/IFileInfo';

export const IT = cn('InfoTable');

enum InfoTableStates {
  READY = 'ready',
  LOADING = 'loading'
}

const InfoTable = (): React.ReactElement => {
  const { repositoryId, hash, path } = useParams<IURLParams>();
  if (!repositoryId) {
    return <></>;
  }

  const [tableState, setTableState] = useState<InfoTableStates>(InfoTableStates.READY);
  const [items, setTableItems] = useState<IFileInfo[]>([]);
  useEffect(() => {
    setTableState(InfoTableStates.LOADING);
    fetch(api.tree.withParams({ repository: repositoryId, hash: hash || 'master', path: path || '' }))
      .then(result => result.json())
      .then(files => setTableItems(files))
      .then(() => setTableState(InfoTableStates.READY));
  }, [repositoryId, hash, path]);

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Last commit</th>
          <th>Commit message</th>
          <th>Author</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.name}>
            <td>0</td>
            <td>{item.name}</td>
            <td>{item.hash}</td>
            <td>{item.lastMessage}</td>
            <td>{item.author}</td>
            <td>{item.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </Table>

    // <div className={IT()}>
    //   <div className={IT('Header')}>
    //     <div className={IT('Name')}>Name</div>
    //     <div className={IT('Commit')}>Last commit</div>
    //     <div className={IT('Message')}>Commit message</div>
    //     <div className={IT('Committer')}>Committer</div>
    //     <div className={IT('Date')}>Updated</div>
    //   </div>
    //   {tableState === 'ready' &&
    //     infoTableItems.map(item => (
    //       <InfoTableRow item={item} key={`${repositoryId || ''}_${hash || ''}_${path || ''}_${item.name}`} />
    //     ))}
    // </div>
  );
};

export default InfoTable;
