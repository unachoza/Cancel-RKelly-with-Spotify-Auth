import React from 'react';
import UsageStats from 'Components/UsageStats/UsageStats';
import AboutMe from 'Pages/AboutMe/AboutMe.css';
import 'PAges/Conclusion/Conclusion.App.css';

const Conclusion = () => (
  <div>
    <UsageStats />
    <header>What You've Done</header>
    <body>
      <p className="paragraph">
        Congradulations! your actions demonstrate that black girls matter, that you believe women and that abusers shall
        face consequences no matter how many bangers they pump out
      </p>
    </body>
    <AboutMe />
    <footer>Share this!</footer>
  </div>
);

export default Conclusion;
