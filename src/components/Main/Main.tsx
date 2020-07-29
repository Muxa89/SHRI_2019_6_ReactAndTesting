import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Breadcrumbs from 'src/components/Breadcrumbs/Breadcrumbs';
import ItemAndBranchContainer from 'src/components/ItemAndBranchContainer/ItemAndBranchContainer';
import LastCommitInfo from 'src/components/LastCommitInfo/LastCommitInfo';
import ViewSelector from 'src/components/ViewSelector/ViewSelector';
import InfoTable from 'src/components/InfoTable/InfoTable';
import RepositorySelector from 'src/components/RepositorySelector/RepositorySelector';
import DetailPanel from 'src/components/DetailPanel/DetailPanel';

import { blobPath, treeModePath } from 'src/util/constants';
import 'src/components/Main/Main.sass';

const Main = (): React.ReactElement => {
  return (
    <div className='Main'>
      <Route path={[...treeModePath, blobPath]}>
        <RepositorySelector />
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
