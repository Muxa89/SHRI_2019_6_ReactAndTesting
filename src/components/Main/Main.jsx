import React from 'react';

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
      <InfoTable />
    </div>
  );
}
