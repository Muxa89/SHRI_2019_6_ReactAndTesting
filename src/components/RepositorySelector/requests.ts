import { api } from 'src/util/api';

export const fetchRepositoriesRequest = (): Promise<string[]> =>
  fetch(api.repositories.withParams()).then(response => response.json());
