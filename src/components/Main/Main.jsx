import React from 'react';
import { Route } from "react-router-dom";

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ItemAndBranchContainer from '../ItemAndBranchContainer/ItemAndBranchContainer';
import LastCommitInfo from '../LastCommitInfo/LastCommitInfo';
import ViewSelector from '../ViewSelector/ViewSelector';
import InfoTable from '../InfoTable/InfoTable';

import './Main.sass';

export default function Main() {
  return (
    <div className='Main'>
      <Breadcrumbs />
      <ItemAndBranchContainer />
      <LastCommitInfo />
      <ViewSelector />
      <Route path={['/:repositoryId?/tree/:hash/:path([a-zA-Z0-9а-яА-Я._\\-/]+)', '/:repositoryId?/tree/:hash?', '/:repositoryId?']} component={InfoTable} />
    </div>
  );
}
