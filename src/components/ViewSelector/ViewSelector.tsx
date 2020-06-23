import * as React from 'react';

import './ViewSelector.sass';

const ViewSelector = (): React.ReactElement => (
  <div className='ViewSelector'>
    <div className='ViewSelector-Item ViewSelector-Item_selected'>FILES</div>
    <div className='ViewSelector-Item'>BRANCHES</div>
  </div>
);
export default ViewSelector;
