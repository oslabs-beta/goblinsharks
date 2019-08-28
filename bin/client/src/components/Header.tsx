// src/components/Header.tsx

import * as React from 'react';
import { HelpOutline, SettingsApplications, Refresh } from '@material-ui/icons';

import './Header.css'

// Header Props TS typedef.
type HeaderProps = { modes: Array<string>, updateMode: Function }

// Header functional component def.
function Header({ modes, updateMode }: HeaderProps) {
  // An array of mode buttons for the header.
  const modeNavigationItems = modes.map(modeName => {
    return (
      <a id={"header-navigation-item-" + modeName.toLowerCase()}
         key={"header-navigation-item-" + modeName.toLowerCase()}
         className="header-navigation-item"
         onClick={() => updateMode(modeName.toLowerCase())}>
        {modeName}
      </a>
    )
  });

  // Header FC renders the following DOM:
  return (
    <div className="header">
      <div className="header-logo">Goblin&nbsp;Monitor</div>
      <div className="header-navigation">{modeNavigationItems}</div>
      <div className="header-moreinformation">
        <Refresh className="svg_icons"/>
        <SettingsApplications className="svg_icons"/>
        <HelpOutline className="svg_icons"/>
      </div>
    </div>
  );
}

export default Header;
