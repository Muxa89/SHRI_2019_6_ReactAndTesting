import React from 'react';

import './LastCommitInfo.sass';
import '../Commiter/Commiter.sass';
import '../Link/Link.sass';

export default function LastCommitInfo() {
  return (
    <div class='LastCommitInfo'>
      Last commit <span class='Link'>c4d248 </span>on
      <span class='Link'>20 Oct 2017, 12:24 </span>by
      <span class='Commiter'>robot-srch-releaser </span>
    </div>
  );
}
