import React from 'react';
import 'Pages/AboutMe/AboutMe.css';

const AboutMe = () => {
  return (
    <div className="profile-container">
      <img
        className="profile"
        src="https://res.cloudinary.com/dh41vh9dx/image/upload/v1582398836/ariannaHeadShot.png"
        alt="img of app creator"
      />
      <div className="bio">
        <p>
          Built by <span style={{ fontSize: '26px' }}> Arianna Choza,</span> <br></br>a FullStack Engineer driven to
          design a world that promotes equality, creating products that re-image existing conditions, pushing the future
          forward by building products that inform users of their potential and empower them to realize it.
        </p>
        <a href="www.linkedIn.com/in/arianna-choza" target="_blank">
          Find me on LinkedIn
        </a>
        <a href="www.arianna-choza.surge.sh" target="_blank">
          Other Projects
        </a>
        <a href="unachoza@gmail.com" target="_blank">
          Contact Me
        </a>
      </div>
    </div>
  );
};
export default AboutMe;
