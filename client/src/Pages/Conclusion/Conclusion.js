<<<<<<< HEAD:client/src/Pages/Conclusion/Conclusion.js
import React from 'react';
import UsageStats from '../Components/UsageStats';
import AboutMe from './AboutMe';
import './App.css';
=======
import React from "react";
import UsageStats from "Components/UsageStats";
import AboutMe from "Components/AboutMe";
import "App.css";
>>>>>>> ea6988ba74082d2e9516ebc19aaa80b6797c0dc3:client/src/Components/Conclusion.js

const Conclusion = () =>  (
    <div>
      <UsageStats />
      <header>What You've Done</header>
      <body>
        <p className="paragraph">
          Congradulations! your actions demonstrate that black girls matter, that you believe women and that abusers
          shall face consequences no matter how many bangers they pump out
        </p>
      </body>
      <AboutMe />
      <footer>Share this!</footer>
    </div>
  );

export default Conclusion;
