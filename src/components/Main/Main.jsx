import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ItemAndBranchContainer from '../ItemAndBranchContainer/ItemAndBranchContainer';
import LastCommitInfo from '../LastCommitInfo/LastCommitInfo';
import ViewSelector from '../ViewSelector/ViewSelector';
import InfoTable from '../InfoTable/InfoTable';
import DetailPanel from '../DetailPanel/DetailPanel';

import './Main.sass';

export default function Main() {
  return (
    <div className='Main'>
      <Breadcrumbs />
      <ItemAndBranchContainer />
      <LastCommitInfo />
      <ViewSelector />
      <Switch>
        <Route
          path='/:repositoryId?/blob/:hash/:path([a-zA-Z0-9а-яА-Я._\-/]+)'
          component={DetailPanel}
        />
        <Route
          path={[
            '/:repositoryId?/tree/:hash/:path([a-zA-Z0-9а-яА-Я._\\-/]+)',
            '/:repositoryId?/tree/:hash?',
            '/:repositoryId?'
          ]}
          component={InfoTable}
        />
      </Switch>
    </div>
  );
}
