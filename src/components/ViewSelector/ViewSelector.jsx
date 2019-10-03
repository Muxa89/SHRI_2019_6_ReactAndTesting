import React from 'react';

import './ViewSelector.sass';

export default function ViewSelector() {
  return (
    <div className='ViewSelector'>
      <div className='ViewSelector-Item ViewSelector-Item_selected'>FILES</div>
      <div className='ViewSelector-Item'>BRANCHES</div>
    </div>
  );
}
