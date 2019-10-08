/* eslint-disable no-undef */
jest.mock('fs');
require('fs').readdir.mockImplementation((folder, options, cb) => {
  const isDirectoryMock = jest.fn().mockReturnValue(true);
  cb(null, [
    { isDirectory: isDirectoryMock, name: 'Repo1' },
    { isDirectory: isDirectoryMock, name: 'Repo2' },
    { isDirectory: isDirectoryMock, name: 'Repo3' },
    { isDirectory: isDirectoryMock, name: 'Repo4' } // getGitDir throws error on this repo
  ]);
});
