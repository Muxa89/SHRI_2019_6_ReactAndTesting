import * as React from 'react';
import ITreeEntryInfo from 'src/interfaces/ITreeEntryInfo';
import { IEntryType } from 'src/interfaces/IEntryType';
import { Link } from 'react-router-dom';
import { getHref } from 'src/util/getHref';
import { FULL_DATE_TIME_FORMAT, HUMAN_READABLE_DATE_TIME_FORMAT } from 'src/util/constants';
import File from 'src/components/InfoTable/icons/File';
import Folder from 'src/components/InfoTable/icons/Folder';
import moment = require('moment');

const EntryRow = ({
  item: { lastCommit, name, type },
  repositoryId,
  hash,
  path
}: {
  item: ITreeEntryInfo;
  repositoryId: string | undefined;
  hash: string | undefined;
  path: string | undefined;
}): React.ReactElement => (
  <tr>
    <td>{type === IEntryType.FILE ? <File /> : <Folder />}</td>
    <td>
      <Link
        to={getHref({
          repositoryId: repositoryId,
          mode: type === IEntryType.FILE ? 'blob' : 'tree',
          hash: hash,
          path: `${path || ''}${path ? '/' : ''}${name}`
        })}
      >
        {name}
      </Link>
    </td>
    <td>{lastCommit.hash}</td>
    <td>{lastCommit.message}</td>
    <td>{lastCommit.author}</td>
    <td title={moment(lastCommit.timestamp).format(FULL_DATE_TIME_FORMAT)}>
      {moment(lastCommit.timestamp).format(HUMAN_READABLE_DATE_TIME_FORMAT)}
    </td>
  </tr>
);

export default EntryRow;
