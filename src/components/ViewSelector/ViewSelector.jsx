import React from 'react';

import './ViewSelector.sass';

export default function ViewSelector() {
  return (
    <div class='ViewSelector'>
      <div class='ViewSelector-Item ViewSelector-Item_selected'>FILES</div>
      <div class='ViewSelector-Item'>BRANCHES</div>
    </div>
  );
}
