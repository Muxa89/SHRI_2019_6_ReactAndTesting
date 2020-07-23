import * as React from 'react';
import Folder from 'src/components/InfoTable/icons/Folder';
import { Link } from 'react-router-dom';
import { getHref } from 'src/util/getHref';

const getParent = (path: string): string => {
  const pathParts = path.split('/');
  return pathParts.slice(0, pathParts.length - 1).join('/');
};

const ParentRow = ({
  repositoryId,
  hash,
  path
}: {
  repositoryId: string;
  hash: string | undefined;
  path: string | undefined;
}): React.ReactElement => (
  <tr>
    <td>
      <Folder />
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

export default ParentRow;
