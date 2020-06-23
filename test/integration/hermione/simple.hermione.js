/* eslint-disable no-undef */

const assert = require('chai').assert;

describe('Root page', function() {
  it('Shows list of repositories', function() {
    return this.browser
      .url('/')
      .waitForExist('.InfoTable-Row')
      .isExisting('.InfoTable-Row')
      .then(exists => {
        assert.isTrue(exists);
      })
      .getText('.InfoTable-Row > a > .InfoTable-Name > .InfoTable-Text')
      .then(repoNames => {
        assert.sameOrderedMembers(
          repoNames,
          ['Repo_1', 'Repo_2', 'Repo_3', 'Repo_4', 'Repo_5'],
          'Names of repositories is different'
        );
      });
  });

  it('Redirects to child dir when clicked on repository name', function() {
    return this.browser
      .url('/')
      .waitForExist('.InfoTable-Row')
      .click('.InfoTable-Row > a')
      .waitForExist('.InfoTable-Row')
      .getUrl()
      .then(url => {
        assert.equal(url, 'http://localhost:8000/Repo_1/tree/master/');
      });
  });

  it('Not shows link to parent dir when in root', function() {
    return this.browser
      .url('/')
      .waitForExist('.InfoTable-Row')
      .getText('.InfoTable-Row')
      .then(text => {
        assert.notEqual(text[0], '../');
      });
  });
});

describe('Repository page', function() {
  it('Shows files and folders list in repository', function() {
    return this.browser
      .url('/Repo_1')
      .waitForExist('.InfoTable-Row')
      .isExisting('.InfoTable-Row')
      .then(exists => {
        assert.isTrue(exists);
      })
      .getText('.InfoTable-Row > a > .InfoTable-Name > .InfoTable-Text')
      .then(repoNames => {
        assert.includeMembers(
          repoNames,
          ['Folder_1', 'Folder_2', 'Folder_3', 'File_1', 'File_2', 'File_3'],
          'Names of repositories is different'
        );
      });
  });

  it('Shows link to parent dir in repository', function() {
    return this.browser
      .url('/Repo_1/')
      .waitForExist('.InfoTable-Row')
      .getText('.InfoTable-Row')
      .then(text => {
        assert.equal(text[0], '../');
      });
  });

  it('Redirects to root when clicked in repositories first level', function() {
    return this.browser
      .url('/Repo_1/')
      .waitForExist('.InfoTable-Row')
      .click('.InfoTable-Row:nth-child(2) > a')
      .waitForExist('.InfoTable-Row')
      .getUrl()
      .then(url => {
        assert.equal(url, 'http://localhost:8000/');
      });
  });

  it('Redirects one level deeper when clicked on folder in repositories first level', function() {
    return this.browser
      .url('/Repo_1/')
      .waitForExist('.InfoTable-Row')
      .click('.InfoTable-Row:nth-child(3) > a')
      .waitForExist('.InfoTable-Row')
      .getUrl()
      .then(url => {
        assert.equal(url, 'http://localhost:8000/Repo_1/tree/master/Folder_1/');
      })
      .getText('.InfoTable-Row > a > .InfoTable-Name > .InfoTable-Text')
      .then(repoNames => {
        assert.includeMembers(
          repoNames,
          ['Folder_1', 'Folder_2', 'Folder_3', 'File_1', 'File_2', 'File_3'],
          'Names of repositories is different'
        );
      });
  });

  it('Redirects to file detail page when clicked on file', function() {
    return this.browser
      .url('/Repo_1')
      .waitForExist('.InfoTable-Row')
      .click('.InfoTable-Row:nth-child(6) > a')
      .waitForExist('.DetailPanel')
      .isExisting('.DetailPanel')
      .then(exists => {
        assert.isTrue(exists);
      })
      .getUrl()
      .then(url => {
        assert.equal(url, 'http://localhost:8000/Repo_1/blob/master/File_1');
      });
  });
});
