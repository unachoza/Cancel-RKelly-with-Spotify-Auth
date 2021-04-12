import React from 'react';
import 'Components/Nav/Nav.css';
import { SPOTIFY_LOGO } from 'Constants/images';

const navigationPages = ['HOME', 'YOUR PLAYLISTS', 'HOW IT WORKS', 'ABOUT ME'];

const Nav = ({ changeNav }) => {
  return (
    <ul className="nav-list">
      <li>
        <img className="spotify-logo" src={SPOTIFY_LOGO} alt="spotify logo" />
      </li>
      {navigationPages.map((page) => (
        <li onClick={(e) => changeNav(e)}>{page}</li>
      ))}
    </ul>
  );
};

export default Nav;
