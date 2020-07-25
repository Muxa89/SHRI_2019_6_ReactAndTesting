import { api } from 'src/util/api';

export const fetchLastCommitData = (repositoryId: string, hash: string) =>
  fetch(
    api.lastCommit.withParams({
      repository: repositoryId,
      branch: hash
    })
  ).then(response => response.json());
