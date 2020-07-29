import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { prism } from './prismFileHighlightPlugin';
import '../../../node_modules/prismjs/themes/prism.css';
import '../../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css';
import '../../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.min.js';

import './DetailPanel.sass';
import IURLParams from 'src/interfaces/IURLParams';

const DetailPanel = (): React.ReactElement => {
  const urlParams = useParams();
  const { repositoryId, hash, path } = urlParams as IURLParams;
  const dataSource = `http://localhost:3000/api/repos/${repositoryId}/blob/${hash}/${path}`;
  const pathParts = (path || '').split('/').filter(part => part !== '');
  const fileName = pathParts[pathParts.length - 1];

  useEffect(() => {
    prism.fileHighlight();
  }, [urlParams]);

  return (
    <div className='DetailPanel'>
      <div className='DetailPanel-Header'>
        <div className='DetailPanel-FileIcon' />
        <div className='DetailPanel-FileName'>{fileName}</div>
      </div>
      <div className='DetailPanel-Preview'>
        <pre className='line-numbers' data-src={dataSource} />
      </div>
    </div>
  );
};

export default DetailPanel;
