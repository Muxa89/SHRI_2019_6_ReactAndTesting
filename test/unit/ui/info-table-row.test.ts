/* eslint-disable no-undef */

import { getItemLink, getParentLink } from '../../../src/components/InfoTable/InfoTableRow';

import { InfoTableItemType, InfoTableUrlParams, InfoTableItem } from '../../../src/components/InfoTable/InfoTableTypes';

describe('item link test', () => {
  describe('correct requests', () => {
    test('empty params', () => {
      expect(getItemLink({})).toEqual('/');
    });

    test('to master branch (hash undefined)', () => {
      const item: InfoTableItem = {
        name: 'repoName',
        type: InfoTableItemType.FOLDER
      };
      expect(getItemLink({}, item)).toEqual(`/${item.name}/tree/master/`);
    });

    test('to specified branch (hash defined)', () => {
      const params: InfoTableUrlParams = {
        repositoryId: 'repoName',
        hash: 'hashName'
      };
      expect(getItemLink(params)).toEqual(`/${params.repositoryId}/tree/${params.hash}/`);
    });

    test('to some path', () => {
      const params: InfoTableUrlParams = {
        repositoryId: 'repoName',
        hash: 'hashName',
        path: 'path/to/some/folder'
      };
      expect(getItemLink(params)).toEqual(`/${params.repositoryId}/tree/${params.hash}/${params.path}/`);
    });

    test('to folder in root of repository (path undefined)', () => {
      const params: InfoTableUrlParams = {
        repositoryId: 'repoName',
        hash: 'hashName'
      };
      const item: InfoTableItem = {
        name: 'itemName',
        type: InfoTableItemType.FOLDER
      };
      expect(getItemLink(params, item)).toEqual(`/${params.repositoryId}/tree/${params.hash}/${item.name}/`);
    });

    test('to file in root of repository (path undefined)', () => {
      const params: InfoTableUrlParams = {
        repositoryId: 'repoName',
        hash: 'hashName'
      };
      const item: InfoTableItem = {
        name: 'itemName',
        type: InfoTableItemType.FILE
      };
      expect(getItemLink(params, item)).toEqual(`/${params.repositoryId}/blob/${params.hash}/${item.name}`);
    });

    test('to folder in some path', () => {
      const params: InfoTableUrlParams = {
        repositoryId: 'repoName',
        hash: 'hashName',
        path: 'path/to/some/folder'
      };
      const item: InfoTableItem = {
        name: 'itemName',
        type: InfoTableItemType.FOLDER
      };
      expect(getItemLink(params, item)).toEqual(
        `/${params.repositoryId}/tree/${params.hash}/${params.path}/${item.name}/`
      );
    });

    test('to file in some path', () => {
      const params: InfoTableUrlParams = {
        repositoryId: 'repoName',
        hash: 'hashName',
        path: 'path/to/some/file'
      };
      const item: InfoTableItem = {
        name: 'itemName',
        type: InfoTableItemType.FILE
      };
      expect(getItemLink(params, item)).toEqual(
        `/${params.repositoryId}/blob/${params.hash}/${params.path}/${item.name}`
      );
    });

    test('to repository list from repository root (hash undefined)', () => {
      const params: InfoTableUrlParams = {
        repositoryId: 'repoName'
      };
      expect(getParentLink(params)).toEqual(`/`);
    });

    test('to repository list from repository root (hash specified)', () => {
      const params: InfoTableUrlParams = {
        repositoryId: 'repoName',
        hash: 'hashName'
      };
      expect(getParentLink(params)).toEqual(`/`);
    });

    test('to one level higher if in some path', () => {
      const params: InfoTableUrlParams = {
        repositoryId: 'repoName',
        hash: 'hashName',
        path: 'level1/level2'
      };
      expect(getParentLink(params)).toEqual(`/${params.repositoryId}/tree/${params.hash}/level1/`);
    });

    test('to trim slashes in path', () => {
      const expected = 'level1/level2';
      const params: InfoTableUrlParams = {
        repositoryId: 'repoName',
        hash: 'hashName',
        path: `/${expected}/`
      };
      expect(getItemLink(params)).toEqual(`/${params.repositoryId}/tree/${params.hash}/${expected}/`);
    });
  });

  describe('incorrect requests', () => {
    test('empty repo', () => {
      const params: InfoTableUrlParams = {
        repositoryId: ''
      };

      expect(() => getItemLink(params)).toThrowError();
    });

    test('hash without repo', () => {
      const params: InfoTableUrlParams = {
        hash: 'hashName'
      };

      expect(() => getItemLink(params)).toThrowError();
    });

    test('hash with empty repo', () => {
      const params: InfoTableUrlParams = {
        repositoryId: '',
        hash: 'hashName'
      };

      expect(() => getItemLink(params)).toThrowError();
    });
  });
});
