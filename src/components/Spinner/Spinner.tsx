import * as React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = ({
  children,
  isSpinnerVisible
}: {
  isSpinnerVisible: boolean;
  children: React.ReactElement;
}): React.ReactElement => (isSpinnerVisible ? <BootstrapSpinner animation='border' /> : children);

export default Spinner;
