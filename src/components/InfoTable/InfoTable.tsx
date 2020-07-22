import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './InfoTable.sass';
import '../Link/Link.sass';
import '../Commiter/Commiter.sass';
import IURLParams from 'src/interfaces/IURLParams';
import { api } from 'src/util/api';
import Table from 'react-bootstrap/Table';
import ITreeEntryInfo from 'src/interfaces/ITreeEntryInfo';
import { FULL_DATE_TIME_FORMAT, HUMAN_READABLE_DATE_TIME_FORMAT } from 'src/util/constants';
import { orderBy } from 'lodash';
import { getDefaultHash } from 'src/util/defaultHash';
import { IEntryType } from 'src/interfaces/IEntryType';
import { getHref } from 'src/util/getHref';
import moment = require('moment');

enum TableState {
  READY = 'ready',
  LOADING = 'loading'
}

enum TableColumn {
  TYPE = 'type',
  NAME = 'name',
  HASH = 'hash',
  MESSAGE = 'message',
  AUTHOR = 'author',
  TIMESTAMP = 'timestamp'
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

const FOLDER_ICON = '/images/FolderIcon.svg';
const FILE_ICON = '/images/FileIcon.svg';

const getSortParams = (by: TableColumn, order: SortOrder): { iteratee: string[]; orders: SortOrder[] } => {
  switch (by) {
    case TableColumn.HASH:
    case TableColumn.MESSAGE:
    case TableColumn.AUTHOR:
    case TableColumn.TIMESTAMP:
      return {
        iteratee: [`lastCommit.${by}`],
        orders: [order]
      };
    default:
    case TableColumn.NAME:
      return {
        iteratee: [TableColumn.TYPE, TableColumn.NAME],
        orders: [SortOrder.DESC, order]
      };
  }
};

const sortTableItems = (items: ITreeEntryInfo[], by: TableColumn, order: SortOrder): ITreeEntryInfo[] => {
  const { iteratee, orders } = getSortParams(by, order);
  return orderBy(items, iteratee, orders);
};

const getParent = (path: string): string => {
  const pathParts = path.split('/');
  return pathParts.slice(0, pathParts.length - 1).join('/');
};

const InfoTable = (): React.ReactElement => {
  const { repositoryId, hash, path } = useParams<IURLParams>();
  if (!repositoryId) {
    return <></>;
  }

  const [tableState, setTableState] = useState<TableState>(TableState.READY);
  const [items, setTableItems] = useState<ITreeEntryInfo[]>([]);
  const [sortBy, setSortBy] = useState<TableColumn>(TableColumn.NAME);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);

  const changeSortOrder = (by: TableColumn): (() => void) => () => {
    let newSortOrder;

    if (sortBy === by) {
      newSortOrder = sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    } else {
      newSortOrder = SortOrder.ASC;
    }

    setSortBy(by);
    setSortOrder(newSortOrder);
    setTableItems(sortTableItems(items, by, newSortOrder));
  };

  useEffect(() => {
    setTableState(TableState.LOADING);
    fetch(api.tree.withParams({ repository: repositoryId, hash: getDefaultHash(), path: path || '' }))
      .then(result => result.json())
      .then(items => sortTableItems(items, sortBy, sortOrder))
      .then(files => setTableItems(files))
      .then(() => setTableState(TableState.READY));
  }, [repositoryId, hash, path]);

  // TODO add spinner on file loading
  // TODO add sort column indicator
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th onClick={changeSortOrder(TableColumn.NAME)}>Name</th>
          <th onClick={changeSortOrder(TableColumn.HASH)}>Last commit</th>
          <th onClick={changeSortOrder(TableColumn.MESSAGE)}>Commit message</th>
          <th onClick={changeSortOrder(TableColumn.AUTHOR)}>Author</th>
          <th onClick={changeSortOrder(TableColumn.TIMESTAMP)}>Updated</th>
        </tr>
      </thead>
      <tbody>
        {path && tableState === TableState.READY && (
          <tr>
            <td>
              <img src={FOLDER_ICON} alt={'folder'} />
            </td>
            <td>
              <Link to={getHref({ repositoryId, mode: 'tree', hash, path: getParent(path) })}>..</Link>
            </td>
          </tr>
        )}
        {tableState === TableState.READY &&
          items.map(item => (
            <tr key={item.name}>
              <td>
                {item.type === IEntryType.FILE ? (
                  <img src={FILE_ICON} alt={'file'} />
                ) : (
                  <img src={FOLDER_ICON} alt={'folder'} />
                )}
              </td>
              <td>
                <Link
                  to={getHref({
                    repositoryId,
                    mode: item.type === IEntryType.FILE ? 'blob' : 'tree',
                    hash,
                    path: `${path || ''}${path ? '/' : ''}${item.name}`
                  })}
                >
                  {item.name}
                </Link>
              </td>
              <td>{item.lastCommit.hash}</td>
              <td>{item.lastCommit.message}</td>
              <td>{item.lastCommit.author}</td>
              <td title={moment(item.lastCommit.timestamp).format(FULL_DATE_TIME_FORMAT)}>
                {moment(item.lastCommit.timestamp).format(HUMAN_READABLE_DATE_TIME_FORMAT)}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default InfoTable;
