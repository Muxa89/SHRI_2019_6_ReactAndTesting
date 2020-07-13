import * as React from 'react';
import { slice } from 'lodash';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Breadcrumbs.sass';
import { URLParams } from 'src/interfaces/URLParams';
import { getHref } from 'src/util/getHref';

export enum CrumbType {
  REPO = 'REPO',
  FOLDER = 'FOLDER'
}

interface Crumb {
  name: string;
  type: CrumbType;
  href: string;
}

export const getCrumbs = ({ repositoryId, hash, path }: URLParams): Array<Crumb> => {
  const res = [];

  if (repositoryId) {
    res.push({
      name: repositoryId,
      type: CrumbType.REPO,
      href: getHref({ repositoryId, hash })
    });
  }

  if (path) {
    path.split('/').forEach((element, index, array) => {
      res.push({
        name: element,
        type: CrumbType.FOLDER,
        href: getHref({ repositoryId, hash, path: slice(array, 0, index + 1).join('/') })
      });
    });
  }

  return res;
};

const Breadcrumbs = (): React.ReactElement => {
  const urlParams = useParams();
  return (
    <Breadcrumb>
      {getCrumbs(urlParams).map((crumb, index, array) => (
        <Breadcrumb.Item key={index} href={crumb.href} active={index === array.length - 1}>
          {crumb.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
