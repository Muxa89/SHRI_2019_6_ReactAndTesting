import React from 'react';

import './DetailPanel.sass';

export default function DetailPanel() {
  return (
    <div className='DetailPanel'>
      <div className='DetailPanel-Header'>
        <div className='DetailPanel-FileIcon'></div>
        <div className='DetailPanel-FileName'>ya.make</div>
        <div className='DetailPanel-FileSize'>(4 347 bytes)</div>
        <div className='DetailPanel-DownloadButton'></div>
      </div>
      <div className='DetailPanel-Preview'>
        <pre className='line-numbers language-python'>
          <code className=' language-python'>
            {' '}
            <span className='token comment'>#!/usr/bin/env python</span>
            <span className='token keyword'>import</span> os
            <span className='token keyword'>import</span> sys
            <span className='token keyword'>import</span> platform
            <span className='token keyword'>import</span> json URLS{' '}
            <span className='token operator'>=</span>{' '}
            <span className='token punctuation'>[</span>
            <span className='token string'>
              'https://proxy.sandbox.yandex-team.ru/453818264'
            </span>
            <span className='token punctuation'>,</span>{' '}
            <span className='token string'>
              'http://storage-int.mds.yandex.net/get-sandbox/110738/by_platform.json.453815347'
            </span>
            <span className='token punctuation'>]</span>
            MD5 <span className='token operator'>=</span>{' '}
            <span className='token string'>
              '7f5a85f9c28d35c3a76d8cea7af51106'
            </span>
            RETRIES <span className='token operator'>=</span>{' '}
            <span className='token number'>5</span>
            HASH_PREFIX <span className='token operator'>=</span>{' '}
            <span className='token number'>10</span>
            HOME_DIR <span className='token operator'>=</span> os
            <span className='token punctuation'>.</span>path
            <span className='token punctuation'>.</span>expanduser
            <span className='token punctuation'>(</span>
            <span className='token string'>'~'</span>
            <span className='token punctuation'>)</span>
            <span className='token keyword'>def</span>{' '}
            <span className='token function'>create_dirs</span>
            <span className='token punctuation'>(</span>path
            <span className='token punctuation'>)</span>
            <span className='token punctuation'>:</span>
            <span className='token keyword'>try</span>
            <span className='token punctuation'>:</span>
            os<span className='token punctuation'>.</span>makedirs
            <span className='token punctuation'>(</span>path
            <span className='token punctuation'>)</span>
            <span className='token keyword'>except</span> OSError{' '}
            <span className='token keyword'>as</span> e
            <span className='token punctuation'>:</span>
            <span className='token keyword'>import</span> errno
            <span className='token keyword'>if</span> e
            <span className='token punctuation'>.</span>errno{' '}
            <span className='token operator'>!=</span> errno
            <span className='token punctuation'>.</span>EEXIST
            <span className='token punctuation'>:</span>
            <span className='token keyword'>raise</span>
            <span className='token keyword'>return</span> path
            <span className='token keyword'>def</span>{' '}
            <span className='token function'>misc_root</span>
            <span className='token punctuation'>(</span>
            <span className='token punctuation'>)</span>
            <span className='token punctuation'>:</span>
            <span className='token keyword'>return</span> create_dirs
            <span className='token punctuation'>(</span>os
            <span className='token punctuation'>.</span>getenv
            <span className='token punctuation'>(</span>
            <span className='token string'>'YA_CACHE_DIR'</span>
            <span className='token punctuation'>)</span>{' '}
            <span className='token keyword'>or</span> os
            <span className='token punctuation'>.</span>path
            <span className='token punctuation'>.</span>join
            <span className='token punctuation'>(</span>HOME_DIR
            <span className='token punctuation'>,</span>{' '}
            <span className='token string'>'.ya'</span>
            <span className='token punctuation'>)</span>
            <span className='token punctuation'>)</span>
            <span className='token keyword'>def</span>{' '}
            <span className='token function'>tool_root</span>
            <span className='token punctuation'>(</span>
            <span className='token punctuation'>)</span>
            <span className='token punctuation'>:</span>
            <span className='token keyword'>def</span>{' '}
            <span className='token function'>create_dirs</span>
            <span className='token punctuation'>(</span>path
            <span className='token punctuation'>)</span>
            <span className='token punctuation'>:</span>
            <span className='token keyword'>try</span>
            <span className='token punctuation'>:</span>
            os<span className='token punctuation'>.</span>makedirs
            <span className='token punctuation'>(</span>path
            <span className='token punctuation'>)</span>
            <span className='token keyword'>except</span> OSError{' '}
            <span className='token keyword'>as</span> e
            <span className='token punctuation'>:</span>
            <span className='token keyword'>import</span> errno
            <span className='token keyword'>if</span> e
            <span className='token punctuation'>.</span>errno{' '}
            <span className='token operator'>!=</span> errno
            <span className='token punctuation'>.</span>EEXIST
            <span className='token punctuation'>:</span>
            <span className='token keyword'>raise</span>
            <span className='token keyword'>return</span> path
            <span aria-hidden='true' className='line-numbers-rows'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </code>
        </pre>
      </div>
    </div>
  );
}
