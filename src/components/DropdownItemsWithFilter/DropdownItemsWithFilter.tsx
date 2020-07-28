import * as React from 'react';
import { useState } from 'react';
import { includes } from 'lodash';
import { Spinner } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const filterChildren = (children: React.ReactElement<{ children: string }>[], filter: string): React.ReactNode[] =>
  children.filter(child => child && includes(child.props.children.toLowerCase(), filter.toLowerCase()));

const DropdownItemsWithFilter = ({
  isSpinnerVisible,
  filterPlaceholder,
  children
}: {
  isSpinnerVisible: boolean;
  filterPlaceholder: string;
  children: React.ReactElement<{ children: string }>[];
}): React.ReactElement => {
  if (isSpinnerVisible) {
    return <Spinner animation='border' />;
  }

  const [filter, setFilter] = useState<string>('');

  return (
    <>
      <Form.Control
        autoFocus
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
        placeholder={filterPlaceholder}
      />
      <Dropdown.Divider />
      {filterChildren(children, filter)}
    </>
  );
};

export default DropdownItemsWithFilter;
