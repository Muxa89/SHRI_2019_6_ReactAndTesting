import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import prism from 'prismjs';

import './DetailPanel.sass';

export default function DetailPanel() {
  const urlParams = useParams();
  const { repositoryId, hash, path } = urlParams;
  const dataSource = `http://localhost:3000/api/repos/${repositoryId}/blob/${hash}/${path}`;
  const pathParts = (path || '').split('/').filter(part => part !== '');
  const fileName = pathParts[pathParts.length - 1];

  useEffect(() => {
    prism.fileHighlight();
  }, [urlParams]);

  return (
    <div className='DetailPanel'>
      <div className='DetailPanel-Header'>
        <div className='DetailPanel-FileIcon'></div>
        <div className='DetailPanel-FileName'>{fileName}</div>
      </div>
      <div className='DetailPanel-Preview'>
        <pre className='line-numbers' data-src={dataSource}></pre>
      </div>
    </div>
  );
}
