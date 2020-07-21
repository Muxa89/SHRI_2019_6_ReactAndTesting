import * as pathToRegexp from 'path-to-regexp';

class Endpoint<T extends Record<string, unknown>> {
  public path: string;
  public withParams: (params?: T) => string;
  public params: T;

  constructor(path: string) {
    this.path = path;
    this.withParams = pathToRegexp.compile<T>(path);
    this.params = {} as T;
  }
}

export const api = {
  repositories: new Endpoint('/api/repositories'),
  branches: new Endpoint<{ repository: string }>('/api/repo/:repository/branches'),
  lastCommit: new Endpoint<{ repository: string; branch: string }>('/api/repo/:repository/branch/:branch/lastCommit'),
  tree: new Endpoint<{ repository: string; hash: string; path: string }>(
    '/api/repo/tree/:repository/hash/:hash/path/:path([^#\\?]+?)'
  )
};
