import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { IT } from './InfoTable';

const getItemLink = (item, params) => {
  let res = '/';

  const repositoryId = params.repositoryId;

  if (repositoryId === undefined) {
    res += `${item.name}/`;
    return res;
  }

  res += `${repositoryId}/`;
  res += item.type === 'folder' ? `tree/` : 'blob/';

  const hash = params.hash;

  res += `${hash || 'master'}/`;

  let path = params.path;
  if (path === undefined) {
    path = '';
  } else {
    path = path
      .split('/')
      .filter(item => item !== '')
      .join('/');
  }
  res += `${path || ''}${path !== '' ? '/' : ''}${item.name}`;
  return res;
};

const getParentLink = (item, { repositoryId, hash, path }) => {
  if (path !== undefined) {
    let pathParts = path.split('/').filter(item => item !== '');
    if (pathParts.length === 1) {
      return getItemLink({ name: '', type: item.type }, { repositoryId, hash });
    } else {
      return getItemLink(
        { name: '', type: item.type },
        {
          repositoryId,
          hash,
          path: pathParts.slice(0, pathParts.length - 1).join('/')
        }
      );
    }
  } else {
    return '/';
  }
};

export default ({ item }) => {
  const params = useParams();
  return (
    <div className={IT('Row')} key={`${item.name}:${item.commit}`}>
      <NavLink
        to={
          item.name === '../'
            ? getParentLink(item, params)
            : getItemLink(item, params)
        }
      >
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
