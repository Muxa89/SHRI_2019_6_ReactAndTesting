import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { isUndefined as isUndef } from 'lodash';

export const IT = cn('InfoTable');
// import { IT } from './InfoTable';

const isUndefined = (arr: Array<string | undefined>): boolean =>
  arr.every(isUndef);

const isNotEmpty = (arr: Array<string | undefined>): boolean =>
  arr.every(value => !isUndef(value) && value !== '');

const rebuildPath = (path: string | undefined): string =>
  (path || '')
    .split('/')
    .filter(part => part !== '')
    .join('/');

export const getItemLink = (
  currentUrlParams: InfoTableUrlParams,
  targetItem?: InfoTableItem
): string => {
  const { repositoryId, hash, path } = currentUrlParams;
  const { name, type } = targetItem || {};

  if (isUndefined([repositoryId, hash, path, name, type])) {
    return '/';
  }

  // current url example: '/', target item example: {name: 'some repo', type: 'folder'}
  if (isNotEmpty([name, type]) && isUndefined([repositoryId, hash, path])) {
    return `/${name}/tree/master/`;
  }

  // current url example: '/someRepo/tree/master/', target item exapmle: {name: 'some file', type: 'folder'}
  if (isNotEmpty([repositoryId])) {
    let res = `/${[
      repositoryId,
      type === InfoTableItemType.FILE ? 'blob' : 'tree',
      hash || 'master',
      rebuildPath(path),
      `${name || ''}`
    ]
      .filter(i => i !== '')
      .join('/')}`;
    if (type !== InfoTableItemType.FILE) {
      res += '/';
    }
    return res;
  }

  throw new Error(
    [
      'Parameters is incorrect.',
      'params:',
      `${JSON.stringify(currentUrlParams)},`,
      'item:',
      `${JSON.stringify(targetItem)}`
    ].join(' ')
  );
};

export const getParentLink = (currentUrlParams: InfoTableUrlParams): string => {
  const { repositoryId, hash, path } = currentUrlParams || {};

  if (!!repositoryId && !!hash && !!path) {
    const pathParts = rebuildPath(path).split('/');
    pathParts.pop();
    return getItemLink({ repositoryId, hash, path: pathParts.join('/') });
  } else if (!!repositoryId && !!hash && !path) {
    return '/';
  } else if (!!repositoryId && !hash && !path) {
    return '/';
  }

  throw new Error(
    [
      'Parameters is incorrect.',
      'params:',
      `${JSON.stringify(currentUrlParams)},`
    ].join(' ')
  );
};

const getLink = (
  params: InfoTableUrlParams,
  item: InfoTableItem
): string | null => {
  const { type } = item || {};
  try {
    if (type === InfoTableItemType.PARENT) {
      return getParentLink(params);
    } else {
      return getItemLink(params, item);
    }
  } catch (err) {
    console.error(
      `Error occured while preparing link for item in table: ${JSON.stringify(
        err
      )}`
    );
    return null;
  }
};

const getItemLinkWrapper = (
  params: InfoTableUrlParams,
  item: InfoTableItem
): string => {
  const link = getItemLink(params, item);
  console.log(JSON.stringify(params), JSON.stringify(item), link);
  return link;
};

export interface InfoTableItem {
  type: InfoTableItemType;
  name: string;
  commit?: string;
  message?: string;
  commiter?: string;
  date?: string;
}

export interface InfoTableItemParams {
  item: InfoTableItem;
}

export enum InfoTableItemType {
  REPOSITORY = 'repository',
  FOLDER = 'folder',
  FILE = 'file',
  PARENT = 'parent'
}

export interface InfoTableUrlParams {
  repositoryId?: string;
  hash?: string;
  path?: string;
}

export default ({ item }: InfoTableItemParams) => {
  const params = useParams() as InfoTableUrlParams;

  let link = getLink(params, item);
  if (link === null) {
    return null;
  }

  return (
    <div className={IT('Row')} key={`${item.name}:${item.commit}`}>
      <NavLink to={link}>
        <div className={IT('Name')}>
          <div className={IT('EntryIcon', { type: item.type })}></div>
          <div className={IT('Text')}>{item.name}</div>
        </div>
      </NavLink>
      <div className={IT('Commit')}>
        <div className={[IT('Text'), 'Link'].join(' ')}>{item.commit}</div>
      </div>
      <div className={IT('Message')}>{item.message}</div>
      <div className={[IT('Commiter'), 'Commiter'].join(' ')}>
        {item.commiter}
      </div>
      <div className={IT('Date')}>{item.date}</div>
    </div>
  );
};
