/* eslint-disable no-undef */
require('../mock/child_process-execFile');
require('../mock/fs-readdir');
require('../mock/child_process-spawn');

const {
  getAllRepositories,
  getBlobContentPromise,
  getFileInfo,
  getFilesTree,
  getFilesTreeInfo,
  getGitDir
} = require('../../../src/server/api.js');

test('getGitDir', () => {
  getGitDir('someRepo').then(res => {
    expect(res).toBe('.git');
  });
});

test('getAllRepositories', () => {
  getAllRepositories('someRoot', (err, files) => {
    expect(files).toEqual(['Repo1', 'Repo2', 'Repo3']);
  });
});

test('getFilesTree', () => {
  const sortFn = (a, b) => (a.name < b.name ? -1 : 1);

  const expected = [
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
  expected.sort(sortFn);

  getFilesTree({
    folder: 'someRoot',
    gitFolder: '.git'
  }).then(out => {
    out.sort(sortFn);
    expect(out).toEqual(expected);
  });
});

test('getFileInfo', () => {
  getFileInfo({
    folder: 'folder',
    gitFolder: '.git',
    hash: 'master',
    treePath: 'someFile.txt'
  }).then(out =>
    expect(out).toEqual({
      lastCommit: 'abc123',
      message: 'Message',
      commiter: 'Author',
      timestamp: '1545059710'
    })
  );
});

test('getFilesTreeInfo', () => {
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
  const sortFn = (a, b) => (a.name < b.name ? -1 : 1);
  expected.sort(sortFn);

  getFilesTreeInfo({
    folder: 'folder',
    hash: 'master',
    treePath: 'path'
  }).then(files => {
    files.sort(sortFn);
    expect(files).toEqual(expected);
  });
});

test('getBlobContentPromise', () => {
  const stubText = require('../mock/child_process-spawn').stubText;

  getBlobContentPromise('folder', 'master', 'path').then(res => {
    expect(res).toEqual(stubText);
  });
});
