import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import './InfoTable.sass';
import '../Link/Link.sass';
import '../Commiter/Commiter.sass';

import { loadFiles } from '../../store/actions/filesActions';

const IT = cn('InfoTable');

export default function InfoTable() {
  const params = useParams();
  const { repositoryId, hash, path } = params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFiles(repositoryId, hash, path));
  }, [repositoryId, hash, path]);

  const infoTableItems = useSelector(state => state.infoTableItems);

  return (
    <div className={IT()}>
      <div className={IT('Header')}>
        <div className={IT('Name')}>Name</div>
        <div className={IT('Commit')}>Last commit</div>
        <div className={IT('Message')}>Commit message</div>
        <div className={IT('Commiter')}>Commiter</div>
        <div className={IT('Date')}>Updated</div>
      </div>
      {infoTableItems.map(item => {
        return (
          <div className={IT('Row')} key={`${item.name}:${item.commit}`}>
            <NavLink
              to={() => {
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
              }}
            >
              <div className={IT('Name')}>
                <div className={IT('EntryIcon', { type: item.type })}></div>
                <div className={IT('Text')}>{item.name}</div>
              </div>
            </NavLink>
            <div className={IT('Commit')}>
              <div className={[IT('Text'), 'Link'].join(' ')}>
                {item.commit}
              </div>
            </div>
            <div className={IT('Message')}>{item.message}</div>
            <div className={[IT('Commiter'), 'Commiter'].join(' ')}>
              {item.commiter}
            </div>
            <div className={IT('Date')}>{item.date}</div>
          </div>
        );
      })}
    </div>
  );
}
