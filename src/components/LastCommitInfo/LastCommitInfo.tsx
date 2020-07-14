import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IURLParams from 'src/interfaces/IURLParams';
import 'src/components/LastCommitInfo/LastCommitInfo.sass';
import 'src/components/Commiter/Commiter.sass';
import 'src/components/Link/Link.sass';
import { api } from 'src/util/api';
import ICommitInfo from 'src/interfaces/ICommitInfo';

const LastCommitInfo = (): React.ReactElement => {
  const { repositoryId, hash }: IURLParams = useParams();
  if (!repositoryId || !hash) {
    // TODO обработать правильно
    return <div />;
  }

  const [commitInfo, setCommitInfo] = useState<ICommitInfo | null>(null);
  useEffect(() => {
    fetch(api.lastCommit.withParams({ repositoryId, branchId: hash }))
      .then(response => response.json())
      .then(commitInfo => setCommitInfo(commitInfo));
  }, [repositoryId, hash]);

  return (
    <div className='LastCommitInfo'>
      Last commit <span className='Link'>{commitInfo?.hash} </span>on <span className='Link'>{commitInfo?.time} </span>
      by <span className='Committer'>{commitInfo?.author} </span>
    </div>
  );
};

export default LastCommitInfo;
