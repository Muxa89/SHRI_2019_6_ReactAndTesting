import { CrumbType, getCrumbs, getHref } from '../../../src/components/Breadcrumbs/Breadcrumbs';
import { URLParams } from 'src/interfaces/URLParams';

describe('Tests for breadcrumbs href creation', () => {
  test('Only repository provided', () => {
    const repositoryId = 'repo';
    expect(getHref({ repositoryId })).toEqual(`/${repositoryId}`);
  });

  test('Hash added if provided', () => {
    const repositoryId = 'repo';
    const hash = 'hash';
    expect(getHref({ repositoryId, hash })).toEqual(`/${repositoryId}/tree/hash/${hash}`);
  });

  test('Path added if provided', () => {
    const repositoryId = 'repo';
    const path = 'some/path/to/dir';
    expect(getHref({ repositoryId, path })).toEqual(`/${repositoryId}/tree/path/${path}`);
  });

  test('get crumbs test', () => {
    const params: URLParams = {
      repositoryId: 'repo',
      hash: 'qqqq',
      path: 'some/folder/path'
    };
    expect(getCrumbs(params)).toEqual([
      { name: params.repositoryId, type: CrumbType.REPO, href: `/${params.repositoryId}/tree/hash/${params.hash}` },
      { name: 'some', type: CrumbType.FOLDER, href: `/${params.repositoryId}/tree/hash/${params.hash}/path/some` },
      {
        name: 'folder',
        type: CrumbType.FOLDER,
        href: `/${params.repositoryId}/tree/hash/${params.hash}/path/some/folder`
      },
      {
        name: 'path',
        type: CrumbType.FOLDER,
        href: `/${params.repositoryId}/tree/hash/${params.hash}/path/some/folder/path`
      }
    ]);
  });
});
