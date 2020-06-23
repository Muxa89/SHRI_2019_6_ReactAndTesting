import * as React from 'react';

import './Footer.sass';
import '../Link/Link.sass';

export default function Footer() {
  return (
    <div className='Footer'>
      <div className='Footer-Trademark Footer-Text'>
        Trade secrets of Yandex LLC. 16, Lev Tolstoy Str., Moscow, Russia, 119021
      </div>
      <div className='Footer-UiVersion Footer-Text'>UI: 0.1.15</div>
      <div className='Footer-Copyright Footer-Text'>
        © 2007—2019 <span className='Link'>Yandex</span>
      </div>
    </div>
  );
}
