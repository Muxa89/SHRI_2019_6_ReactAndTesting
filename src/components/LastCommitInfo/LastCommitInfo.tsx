import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IURLParams from 'src/interfaces/IURLParams';
import 'src/components/LastCommitInfo/LastCommitInfo.sass';
import 'src/components/Commiter/Commiter.sass';
import 'src/components/Link/Link.sass';
import ICommitInfo from 'src/interfaces/ICommitInfo';
import { FULL_DATE_TIME_FORMAT, HUMAN_READABLE_DATE_TIME_FORMAT } from 'src/util/constants';
import { fetchLastCommitData } from 'src/components/LastCommitInfo/requests';
import moment = require('moment');

const CLASS_NAME = 'LastCommitInfo';

const getTimeString = (timestamp: number): string => {
  const date = moment(timestamp);
  if (date.isAfter(moment().subtract(1, 'd'))) {
    return date.fromNow();
  } else {
    return date.format(HUMAN_READABLE_DATE_TIME_FORMAT);
  }
};

const LastCommitInfo = (): React.ReactElement | null => {
  const { repositoryId, hash }: IURLParams = useParams();
  const [commitInfo, setCommitInfo] = useState<ICommitInfo | null>(null);

  if (!repositoryId || !hash) {
    return null;
  }

  useEffect(() => {
    fetchLastCommitData(repositoryId, hash).then(commitInfo => setCommitInfo(commitInfo));
  }, [repositoryId, hash]);

  if (!commitInfo) {
    return null;
  }

  const { hash: commitHash, timestamp, author } = commitInfo;

  // TODO добавить ссылку на комит
  // TODO добавить тултип для даты
  return (
    <div className={CLASS_NAME}>
      Last commit <span className={`${CLASS_NAME}-Hash`}>{commitHash} </span>on{' '}
      <span className={`${CLASS_NAME}-Time`} title={moment(timestamp).format(FULL_DATE_TIME_FORMAT)}>
        {getTimeString(timestamp)}{' '}
      </span>
      by <span className={`${CLASS_NAME}-Committer`}>{author}</span>
    </div>
  );
};

export default LastCommitInfo;
