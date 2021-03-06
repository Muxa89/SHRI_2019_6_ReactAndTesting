import * as React from 'react';
import { useState } from 'react';
import { includes } from 'lodash';
import { Dropdown } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const filterChildren = (children: React.ReactElement<{ children: string }>[], filter: string): React.ReactNode[] =>
  children.filter(child => child && includes(child.props.children.toLowerCase(), filter.toLowerCase()));

const DropdownFilter = ({
  placeholder,
  children
}: {
  placeholder: string;
  children: React.ReactElement<{ children: string }>[];
}): React.ReactElement => {
  const [filter, setFilter] = useState<string>('');
  return (
    <>
      <Form.Control
        autoFocus
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
        placeholder={placeholder}
      />
      <Dropdown.Divider />
      {filterChildren(children, filter)}
    </>
  );
};

export default DropdownFilter;
