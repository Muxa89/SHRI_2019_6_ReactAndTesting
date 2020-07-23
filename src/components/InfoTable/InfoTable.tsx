import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'src/components/InfoTable/InfoTable.sass';
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

const SortOrderArrow = ({
  column,
  sortBy,
  sortOrder
}: {
  column: TableColumn;
  sortBy: TableColumn;
  sortOrder: SortOrder;
}): React.ReactElement => {
  if (column === sortBy) {
    return <CaretIconComponent sortOrder={sortOrder} />;
  } else {
    return <></>;
  }
};

const SortableTH = ({
  clickHandler,
  column,
  sortBy,
  sortOrder,
  text
}: {
  clickHandler: (by: TableColumn) => () => void;
  column: TableColumn;
  sortBy: TableColumn;
  sortOrder: SortOrder;
  text: string;
}): React.ReactElement => (
  <th className={`${InfoTableClassName}-SortableTableHeader`} onClick={clickHandler(column)}>
    {text} <SortOrderArrow column={column} sortBy={sortBy} sortOrder={sortOrder} />
  </th>
);

const FolderIconComponent = () => <img src={FolderIcon} alt={'folder'} />;

const FileComponent = () => <img src={FileIcon} alt={'file'} />;

const CaretIconComponent = ({ sortOrder }: { sortOrder: SortOrder }) => (
  <img
    className={`${InfoTableClassName}-SortCaret`}
    src={sortOrder === SortOrder.ASC ? CaretDown : CaretUp}
    alt={sortOrder === SortOrder.ASC ? 'asc' : 'desc'}
  />
);

const ParentRow = ({
  repositoryId,
  hash,
  path
}: {
  repositoryId: string;
  hash: string | undefined;
  path: string | undefined;
}) => (
  <tr>
    <td>
      <FolderIconComponent />
    </td>
    <td>
      <Link
        to={
          path
            ? getHref({
                repositoryId: repositoryId,
                mode: 'tree',
                hash,
                path: path && getParent(path)
              })
            : '/repos'
        }
      >
        ../
      </Link>
    </td>
  </tr>
);

const EntryRow = ({
  item: { lastCommit, name, type },
  repositoryId,
  hash,
  path
}: {
  item: ITreeEntryInfo;
  repositoryId: string | undefined;
  hash: string | undefined;
  path: string | undefined;
}) => (
  <tr>
    <td>{type === IEntryType.FILE ? <FileComponent /> : <FolderIconComponent />}</td>
    <td>
      <Link
        to={getHref({
          repositoryId: repositoryId,
          mode: type === IEntryType.FILE ? 'blob' : 'tree',
          hash: hash,
          path: `${path || ''}${path ? '/' : ''}${name}`
        })}
      >
        {name}
      </Link>
    </td>
    <td>{lastCommit.hash}</td>
    <td>{lastCommit.message}</td>
    <td>{lastCommit.author}</td>
    <td title={moment(lastCommit.timestamp).format(FULL_DATE_TIME_FORMAT)}>
      {moment(lastCommit.timestamp).format(HUMAN_READABLE_DATE_TIME_FORMAT)}
    </td>
  </tr>
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
  return (
    <Table className={InfoTableClassName}>
      <colgroup>
        <col className={`${InfoTableClassName}-Type`} />
        <col className={`${InfoTableClassName}-Name`} />
        <col className={`${InfoTableClassName}-LastCommit`} />
        <col className={`${InfoTableClassName}-CommitMessage`} />
        <col className={`${InfoTableClassName}-Author`} />
        <col className={`${InfoTableClassName}-Updated`} />
      </colgroup>
      <thead>
        <tr>
          <th>#</th>
          {([
            [TableColumn.NAME, 'Name'],
            [TableColumn.HASH, 'Last commit'],
            [TableColumn.MESSAGE, 'Commit message'],
            [TableColumn.AUTHOR, 'Author'],
            [TableColumn.TIMESTAMP, 'Updated']
          ] as Array<[TableColumn, string]>).map(([col, text]) => (
            <SortableTH
              key={text}
              column={col}
              text={text}
              clickHandler={changeSortOrder}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {repositoryId && tableState === TableState.READY && (
          <ParentRow repositoryId={repositoryId} hash={hash} path={path} />
        )}
        {tableState === TableState.READY &&
          items.map(item => (
            <EntryRow key={item.name} item={item} repositoryId={repositoryId} hash={hash} path={path} />
          ))}
      </tbody>
    </Table>
  );
};

export default InfoTable;
