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
import * as FileIcon from 'src/components/InfoTable/FileIcon.svg';
import * as FolderIcon from 'src/components/InfoTable/FolderIcon.svg';
import * as CaretDown from 'src/components/InfoTable/CaretDown.svg';
import * as CaretUp from 'src/components/InfoTable/CaretUp.svg';

const InfoTableClassName = 'InfoTable';

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

const SortCaret = ({
  column,
  sortBy,
  sortOrder
}: {
  column: TableColumn;
  sortBy: TableColumn;
  sortOrder: SortOrder;
}): React.ReactElement => {
  if (column === sortBy) {
    return (
      <img
        className={`${InfoTableClassName}-SortCaret`}
        src={sortOrder === SortOrder.ASC ? CaretDown : CaretUp}
        alt='Sort caret indicator'
      />
    );
  } else {
    return <></>;
  }
};

const SortableTableHeader = ({
  clickHandler,
  column,
  sortBy,
  sortOrder,
  children
}: {
  clickHandler: (by: TableColumn) => () => void;
  column: TableColumn;
  sortBy: TableColumn;
  sortOrder: SortOrder;
  children: string;
}): React.ReactElement => (
  <th className={`${InfoTableClassName}-SortableTableHeader`} onClick={clickHandler(column)}>
    {children} <SortCaret column={column} sortBy={sortBy} sortOrder={sortOrder} />
  </th>
);

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
    <Table className='InfoTable'>
      <colgroup>
        <col className='InfoTable-Type' />
        <col className='InfoTable-Name' />
        <col className='InfoTable-LastCommit' />
        <col className='InfoTable-CommitMessage' />
        <col className='InfoTable-Author' />
        <col className='InfoTable-Updated' />
      </colgroup>
      <thead>
        <tr>
          <th>#</th>
          <SortableTableHeader column={TableColumn.NAME} clickHandler={changeSortOrder} {...{ sortBy, sortOrder }}>
            Name
          </SortableTableHeader>
          <SortableTableHeader column={TableColumn.HASH} clickHandler={changeSortOrder} {...{ sortBy, sortOrder }}>
            Last commit
          </SortableTableHeader>
          <SortableTableHeader column={TableColumn.MESSAGE} clickHandler={changeSortOrder} {...{ sortBy, sortOrder }}>
            Commit message
          </SortableTableHeader>
          <SortableTableHeader column={TableColumn.AUTHOR} clickHandler={changeSortOrder} {...{ sortBy, sortOrder }}>
            Author
          </SortableTableHeader>
          <SortableTableHeader column={TableColumn.TIMESTAMP} clickHandler={changeSortOrder} {...{ sortBy, sortOrder }}>
            Updated
          </SortableTableHeader>
        </tr>
      </thead>
      <tbody>
        {path && tableState === TableState.READY && (
          <tr>
            <td>
              <img src={FolderIcon} alt={'folder'} />
            </td>
            <td>
              <Link to={getHref({ repositoryId, mode: 'tree', hash, path: getParent(path) })}>../</Link>
            </td>
          </tr>
        )}
        {tableState === TableState.READY &&
          items.map(item => (
            <tr key={item.name}>
              <td>
                {item.type === IEntryType.FILE ? (
                  <img src={FileIcon} alt={'file'} />
                ) : (
                  <img src={FolderIcon} alt={'folder'} />
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
