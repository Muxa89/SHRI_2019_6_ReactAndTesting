import { api } from 'src/util/api';

const fetchRepositoriesRequest = (): Promise<string[]> =>
  fetch(api.repositories.withParams()).then(response => response.json());

export default fetchRepositoriesRequest;
