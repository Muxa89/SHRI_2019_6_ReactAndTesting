import { api } from 'src/util/api';
import ICommitInfo from 'src/interfaces/ICommitInfo';

export const fetchLastCommitData = (repositoryId: string, hash: string): Promise<ICommitInfo> =>
  fetch(
    api.lastCommit.withParams({
      repository: repositoryId,
      branch: hash
    })
  ).then(response => response.json());
