import React from 'react';

import './Footer.sass';
import '../Link/Link.sass';

export default function Footer() {
  return (
    <div class='Footer'>
      <div class='Footer-Trademark Footer-Text'>
        Trade secrets of Yandex LLC. 16, Lev Tolstoy Str., Moscow, Russia,
        119021
      </div>
      <div class='Footer-UiVersion Footer-Text'>UI: 0.1.15</div>
      <div class='Footer-Copyright Footer-Text'>
        © 2007—2019 <span class='Link'>Yandex</span>
      </div>
    </div>
  );
}
