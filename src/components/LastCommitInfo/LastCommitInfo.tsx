import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IURLParams from 'src/interfaces/IURLParams';
import 'src/components/LastCommitInfo/LastCommitInfo.sass';
import 'src/components/Commiter/Commiter.sass';
import 'src/components/Link/Link.sass';
import { api } from 'src/util/api';
import ICommitInfo from 'src/interfaces/ICommitInfo';
import { FULL_DATE_TIME_FORMAT, HUMAN_READABLE_DATE_TIME_FORMAT } from 'src/util/constants';
import moment = require('moment');

const getTimeString = (timestamp: number | undefined): string => {
  const date = moment(timestamp);
  if (date.isAfter(moment().subtract(1, 'd'))) {
    return date.fromNow();
  } else {
    return date.format(HUMAN_READABLE_DATE_TIME_FORMAT);
  }
};

const LastCommitInfo = (): React.ReactElement => {
  const { repositoryId, hash }: IURLParams = useParams();
  if (!repositoryId || !hash) {
    // TODO обработать правильно
    return <div />;
  }

  const [commitInfo, setCommitInfo] = useState<ICommitInfo | null>(null);
  useEffect(() => {
    fetch(api.lastCommit.withParams({ repository: repositoryId, branch: hash }))
      .then(response => response.json())
      .then(commitInfo => setCommitInfo(commitInfo));
  }, [repositoryId, hash]);

  // TODO добавить ссылку на комит
  // TODO добавить тултип для даты
  return (
    <div className='LastCommitInfo'>
      Last commit <span className='LastCommitInfo-Hash'>{commitInfo?.hash} </span>on{' '}
      <span className='LastCommitInfo-Time' title={moment(commitInfo?.timestamp).format(FULL_DATE_TIME_FORMAT)}>
        {getTimeString(commitInfo?.timestamp)}{' '}
      </span>
      by <span className='Committer'>{commitInfo?.author} </span>
    </div>
  );
};

export default LastCommitInfo;
