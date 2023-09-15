import React from "react";
import Classes from "./Footer.module.css";
function Footer() {
  return (
    <footer className={Classes.foot}>
      <div className={Classes.foot_bottom}>
        <div>
          <span>© Google 2021</span>
        </div>
        <div>
          <span>version: 0.1.0</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
