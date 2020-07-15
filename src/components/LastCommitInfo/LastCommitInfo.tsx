import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IURLParams from 'src/interfaces/IURLParams';
import 'src/components/LastCommitInfo/LastCommitInfo.sass';
import 'src/components/Commiter/Commiter.sass';
import 'src/components/Link/Link.sass';
import { api } from 'src/util/api';
import ICommitInfo from 'src/interfaces/ICommitInfo';
import moment = require('moment');

const FULL_DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm:ss';
const HUMAN_READABLE_DATE_TIME_FORMAT = 'Do MMM YY HH:mm:ss';

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
    fetch(api.lastCommit.withParams({ repositoryId, branchId: hash }))
      .then(response => response.json())
      .then(commitInfo => setCommitInfo(commitInfo));
  }, [repositoryId, hash]);

  // TODO добавить ссылку на комит
  // TODO добавить тултип для даты
  return (
    <div className='LastCommitInfo'>
      Last commit <span className='LastCommitInfo-Hash'>{commitInfo?.hash} </span>on{' '}
      <span className='LastCommitInfo-Time' title={moment(commitInfo?.time).format(FULL_DATE_TIME_FORMAT)}>
        {getTimeString(commitInfo?.time)}{' '}
      </span>
      by <span className='Committer'>{commitInfo?.author} </span>
    </div>
  );
};

export default LastCommitInfo;
