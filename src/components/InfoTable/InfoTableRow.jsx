import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { IT } from './InfoTable';

const getItemLink = (item, params) => {
  const { repositoryId, hash, path } = params;

  let res = '/';

  if (repositoryId === undefined) {
    res += `${item.name}/`;
    return res;
  }

  res += `${repositoryId}/`;
  res += item.type === 'folder' ? `tree/` : 'blob/';
  res += `${hash || 'master'}/`;
  res += `${path || ''}${path !== undefined ? '/' : ''}`;
  res += `${item.name}`;
  return res;
};

export default ({ item }) => {
  const params = useParams();
  return (
    <div className={IT('Row')} key={`${item.name}:${item.commit}`}>
      <NavLink to={getItemLink(item, params)}>
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
