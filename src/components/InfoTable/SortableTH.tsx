import * as React from 'react';
import CaretUp from 'src/components/InfoTable/icons/CaretUp';
import CaretDown from 'src/components/InfoTable/icons/CaretDown';
import { InfoTableClassName, SortOrder, TableColumn } from 'src/components/InfoTable/constants';

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
    {text} {column === sortBy && (sortOrder === SortOrder.ASC ? <CaretUp /> : <CaretDown />)}
  </th>
);

export default SortableTH;
