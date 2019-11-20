import React from "react";
import "../App.css";

const Nav = ({ changeNav }) => {
        
    return (
      <div>
        <div>
          <img
            className="spotify-logo"
            src="https://res.cloudinary.com/dh41vh9dx/image/upload/v1568208607/Spotify_Logo_CMYK_Green.png"
            alt="spotify logo"
          />
        </div>

        <div className="nav-container">
          <ul className="nav-list">
            <li id="home" onClick={(e) => changeNav(e)}>HOME</li>
            <li id="login" onClick={(e) => changeNav(e)}>LOGIN</li>
            <li id="howItWorks" onClick={(e) => changeNav(e)}>VIEW YOUR PLAYLISTS</li>
            <li id="aboutMe" onClick={(e) => changeNav(e)}>ABOUT ME</li>
          </ul>
        </div>
      </div>
    );
  }

export default Nav;
