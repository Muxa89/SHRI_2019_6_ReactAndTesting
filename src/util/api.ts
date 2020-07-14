import * as pathToRegexp from 'path-to-regexp';

function addApi<T extends Record<string, unknown>>(path: string) {
  return {
    path,
    withParams: pathToRegexp.compile<T>(path)
  };
}

export const api = {
  repositories: addApi('/api/repositories'),
  branches: addApi<{ repositoryId: string }>('/api/branches/:repositoryId')
};
