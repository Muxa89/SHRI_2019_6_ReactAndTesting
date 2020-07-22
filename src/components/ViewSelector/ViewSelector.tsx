import * as React from 'react';
import { useParams } from 'react-router';
import 'src/components/ViewSelector/ViewSelector.sass';
import Nav from 'react-bootstrap/Nav';
import IURLParams from 'src/interfaces/IURLParams';
import { getHref } from 'src/util/getHref';

const ViewSelector = (): React.ReactElement => {
  const { repositoryId, mode, hash, path }: IURLParams = useParams();
  return (
    <Nav variant='tabs' className='ViewSelector'>
      <Nav.Item>
        <Nav.Link href={getHref({ repositoryId, mode: 'tree', hash, path })} active={mode === 'tree'}>
          FILES
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href={getHref({ repositoryId, mode: 'branches', hash, path })} active={mode === 'branches'}>
          BRANCHES
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default ViewSelector;
