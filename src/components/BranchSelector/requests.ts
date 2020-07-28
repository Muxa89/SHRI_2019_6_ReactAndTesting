import { api } from 'src/util/api';

export const fetchBranchesRequest = (repositoryId: string): Promise<string[]> =>
  fetch(api.branches.withParams({ repository: repositoryId })).then(response => response.json());
