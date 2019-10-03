import React from 'react';
import { connect } from 'react-redux';
import { cn } from '@bem-react/classname';

import './InfoTable.sass';
import '../Link/Link.sass';
import '../Commiter/Commiter.sass';

const IT = cn('InfoTable');

function InfoTable({ infoTableItems }) {
  return (
    <div className={IT()}>
      <div className={IT('Header')}>
        <div className={IT('Name')}>Name</div>
        <div className={IT('Commit')}>Last commit</div>
        <div className={IT('Message')}>Commit message</div>
        <div className={IT('Commiter')}>Commiter</div>
        <div className={IT('Date')}>Updated</div>
      </div>
      {infoTableItems.map((item, i) => {
        return (
          <div className={IT('Row')} key={i}>
            <div className={IT('Name')}>
              <div className={IT('EntryIcon', { type: item.type })}></div>
              <div className={IT('Text')}>{item.name}</div>
            </div>
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

export default connect(state => ({
  infoTableItems: state.infoTableItems
}))(InfoTable);
