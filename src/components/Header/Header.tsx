import * as React from 'react';

import './Header.sass';
import './Logo.sass';
import './RepositorySelector.sass';
import '../Selector/Selector.sass';

const Header = (): React.ReactElement => (
  <div className='Header'>
    <div className='Logo Header-Logo' />
    {/*<div className='RepositorySelector Header-RepositorySelector Selector'>*/}
    {/*  <div className='RepositorySelector-Text'>*/}
    {/*    <span className='RepositorySelector-Repository'>Repository </span>*/}
    {/*    <span className='RepositorySelector-Name'>Arc</span>*/}
    {/*  </div>*/}
    {/*  <div className='RepositorySelector-Arrow Selector-ArrowDown' />*/}
    {/*</div>*/}
  </div>
);
export default Header;
