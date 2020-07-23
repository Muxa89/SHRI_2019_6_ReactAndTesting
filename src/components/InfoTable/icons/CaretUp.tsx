import * as React from 'react';
import * as CaretUpIcon from 'src/components/InfoTable/icons/CaretUp.svg';
import { InfoTableClassName } from '../constants';

const CaretUp = (): React.ReactElement => (
  <img className={`${InfoTableClassName}-SortCaret`} src={CaretUpIcon} alt={'desc'} />
);

export default CaretUp;
