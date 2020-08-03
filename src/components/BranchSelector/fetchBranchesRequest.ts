import { api } from 'src/util/api';

const fetchBranchesRequest = (repositoryId: string): Promise<string[]> =>
  fetch(api.branches.withParams({ repository: repositoryId })).then(response => response.json());

export default fetchBranchesRequest;
