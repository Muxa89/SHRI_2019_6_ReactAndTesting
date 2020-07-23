import * as React from 'react';
import * as CaretDownIcon from 'src/components/InfoTable/icons/CaretDown.svg';
import { InfoTableClassName } from '../constants';

const CaretDown = (): React.ReactElement => (
  <img className={`${InfoTableClassName}-SortCaret`} src={CaretDownIcon} alt={'desc'} />
);

export default CaretDown;
