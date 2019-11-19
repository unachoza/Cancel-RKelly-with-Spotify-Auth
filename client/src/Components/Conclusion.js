import React from "react";
import UsageStats from "./UsageStats";
import AboutMe from "./AboutMe";
import "./App.css";

const Conclusion = () => {
  return (
    <div>
      <UsageStats />
      <header>What You've Done</header>
      <body>
        <p className="paragraph">
          Congradulations! your actions demonstrate that black girls matter,
          that you believe women and that abusers shall face consequences no matter
          how many bangers they pump out
        </p>
      </body>
      <AboutMe />
      <footer>Share this!</footer>
    </div>
  );
};

export default Conclusion;
