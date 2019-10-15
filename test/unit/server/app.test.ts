/* eslint-disable no-undef */
import * as request from 'supertest';

import '../mock/child_process-execFile';
import '../mock/fs-readdir';
import '../mock/child_process-spawn';

import { getServer } from '../../../src/server/app';

const app = getServer('path_to_root');

test('/api/repos', () => {
  return request(app)
    .get('/api/repos')
    .then(response => {
      expect(response.body).toEqual([
        { name: 'Repo1', type: 'folder' },
        { name: 'Repo2', type: 'folder' },
        { name: 'Repo3', type: 'folder' }
      ]);
    });
});

export interface HasName {
  name: string;
}

export const sortFn = (a: HasName, b: HasName) => (a.name < b.name ? -1 : 1);

describe('/api/repos/:repositoryId/tree*', () => {
  const info = {
    lastCommit: 'abc123',
    message: 'Message',
    commiter: 'Author',
    timestamp: '1545059710'
  };
  const files = [
    { name: '.babelrc', type: 'file' },
    { name: '.dockerignore', type: 'file' },
    { name: '.gitignore', type: 'file' },
    { name: '.gitlab', type: 'folder' },
    { name: 'README.md', type: 'file' },
    { name: 'build.sh', type: 'file' },
    { name: 'config', type: 'folder' },
    { name: 'dockerfiles', type: 'folder' },
    { name: 'increment_version.sh', type: 'file' },
    { name: 'package-lock.json', type: 'file' },
    { name: 'package.json', type: 'file' },
    { name: 'push.sh', type: 'file' },
    { name: 'run.sh', type: 'file' },
    { name: 'server', type: 'folder' },
    { name: 'src', type: 'folder' },
    { name: 'webpack.config.js', type: 'file' }
  ];
  const expected = files.map(file => ({
    name: file.name,
    type: file.type,
    commit: info.lastCommit,
    message: info.message,
    commiter: info.commiter,
    timestamp: info.timestamp
  }));

  expected.sort(sortFn);

  test('/api/repos/:repositoryId', () => {
    return request(app)
      .get('/api/repos/Repo1')
      .then(response => {
        const res = response.body;
        res.sort(sortFn);
        expect(res).toEqual(expected);
      });
  });

  test('/api/repos/:repositoryId/tree/:hash', () => {
    return request(app)
      .get('/api/repos/Repo1/tree/master')
      .then(response => {
        const res = response.body;
        res.sort(sortFn);
        expect(res).toEqual(expected);
      });
  });

  test('/api/repos/:repositoryId/tree/:hash/:path', () => {
    return request(app)
      .get('/api/repos/Repo1/tree/master/src/path/to/file')
      .then(response => {
        const res = response.body;
        res.sort(sortFn);
        expect(res).toEqual(expected);
      });
  });
});

test('/api/repos/:repositoryId/blob/:commitHash/:path([a-zA-Z0-9а-яА-Я._\\-/]+)', () => {
  const expectedText = require('../mock/child_process-spawn').stubText;

  return request(app)
    .get('/api/repos/Repo1/blob/master/path/to/file.js')
    .then(response => {
      expect(response.text).toEqual(expectedText);
    });
});
