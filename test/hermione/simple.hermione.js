/* eslint-disable no-undef */

const assert = require('chai').assert;

const timeout = ms => () =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });

describe('Root page', function() {
  it('Shows repositories', function() {
    return this.browser
      .url('/')
      .isExisting('.InfoTable-Row')
      .then(exists => {
        assert.isTrue(exists);
        return this.browser;
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

  it('Moves to child dir when clicked on repository name', function() {
    return this.browser
      .url('/')
      .isExisting('.InfoTable-Row')
      .then(exists => {
        assert.isTrue(exists);
        return this.browser;
      })
      .$$('.InfoTable-Row > a')
      .then(res => res[0])
      .click()
      .then(timeout(5000))
      .getMeta()
      .then(meta => console.log(meta))
      // .then(url => {
      //   assert.equal(url, 'http://localhost:8000/Repo_1');
      // })
      .then(timeout(5000));
  });
});
