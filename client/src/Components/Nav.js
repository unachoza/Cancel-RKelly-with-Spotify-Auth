import React, { Component } from "react";
import "../App.css";

class Nav extends Component {
    render() {
        
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
            <li id="home" onClick={(e) => this.props.changeNav(e)}>HOME</li>
            <li id="login" onClick={(e) => this.props.changeNav(e)}>LOGIN</li>
            <li id="howItWorks" onClick={(e) => this.props.changeNav(e)}>HOW IT WORKS</li>
            <li id="aboutMe" onClick={(e) => this.props.changeNav(e)}>ABOUT ME</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Nav;
