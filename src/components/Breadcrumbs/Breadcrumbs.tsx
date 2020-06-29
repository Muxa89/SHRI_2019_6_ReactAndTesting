import * as React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useParams } from 'react-router-dom';

import './Breadcrumbs.sass';

enum CrumbType {
  REPO = 'REPO',
  FOLDER = 'FOLDER'
}

interface Crumb {
  name: string;
  type: CrumbType;
}

interface URLParams {
  repositoryId?: string;
  path?: string;
}

const getCrumbs = (params: URLParams): Array<Crumb> => {
  const res = [];

  console.log(params);

  if (params.repositoryId) {
    res.push({
      name: params.repositoryId,
      type: CrumbType.REPO
    });
  }

  if (params.path) {
    params.path.split('/').forEach(element => {
      res.push({
        name: element,
        type: CrumbType.FOLDER
      });
    });
  }

  return res;
};

// TODO add hrefs to crumbs (possibly with react-router.Link)
const Breadcrumbs = (): React.ReactElement => (
  <Breadcrumb>
    {getCrumbs(useParams()).map((crumb, index) => (
      <Breadcrumb.Item key={index}>{crumb.name}</Breadcrumb.Item>
    ))}
  </Breadcrumb>
);

export default Breadcrumbs;
