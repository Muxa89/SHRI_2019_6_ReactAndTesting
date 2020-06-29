import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ItemAndBranchContainer from '../ItemAndBranchContainer/ItemAndBranchContainer';
import LastCommitInfo from '../LastCommitInfo/LastCommitInfo';
import ViewSelector from '../ViewSelector/ViewSelector';
import InfoTable from '../InfoTable/InfoTable';
import DetailPanel from '../DetailPanel/DetailPanel';

import { blobPath, treeModePath } from '../../util/constants';

import './Main.sass';

const Main = (): React.ReactElement => {
  return (
    <div className='Main'>
      <Route path={[...treeModePath, blobPath]}>
        <Breadcrumbs />
        <ItemAndBranchContainer />
        <LastCommitInfo />
        <ViewSelector />
        <Switch>
          <Route path={blobPath} component={DetailPanel} />
          <Route path={treeModePath} component={InfoTable} />
        </Switch>
      </Route>
    </div>
  );
};

export default Main;
