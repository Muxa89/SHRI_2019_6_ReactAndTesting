import * as React from 'react';

import './LastCommitInfo.sass';
import '../Commiter/Commiter.sass';
import '../Link/Link.sass';

export default function LastCommitInfo() {
  return (
    <div className='LastCommitInfo'>
      Last commit <span className='Link'>c4d248 </span>on
      <span className='Link'>20 Oct 2017, 12:24 </span>by
      <span className='Commiter'>robot-srch-releaser </span>
    </div>
  );
}
