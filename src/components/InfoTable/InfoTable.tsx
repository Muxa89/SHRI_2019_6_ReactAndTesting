import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './InfoTable.sass';
import '../Link/Link.sass';
import '../Commiter/Commiter.sass';
import IURLParams from 'src/interfaces/IURLParams';
import { api } from 'src/util/api';
import Table from 'react-bootstrap/Table';
import ITreeEntryInfo from 'src/interfaces/ITreeEntryInfo';

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
  const [items, setTableItems] = useState<ITreeEntryInfo[]>([]);
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
  );
};

export default InfoTable;
