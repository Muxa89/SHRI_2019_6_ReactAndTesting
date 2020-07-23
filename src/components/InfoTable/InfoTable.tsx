import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'src/components/InfoTable/InfoTable.sass';
import IURLParams from 'src/interfaces/IURLParams';
import { api } from 'src/util/api';
import Table from 'react-bootstrap/Table';
import ITreeEntryInfo from 'src/interfaces/ITreeEntryInfo';
import { orderBy } from 'lodash';
import { getDefaultHash } from 'src/util/defaultHash';
import EntryRow from 'src/components/InfoTable/EntryRow';
import ParentRow from 'src/components/InfoTable/ParentRow';
import SortableTH from 'src/components/InfoTable/SortableTH';
import { InfoTableClassName, SortOrder, TableColumn, TableState } from 'src/components/InfoTable/constants';

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
