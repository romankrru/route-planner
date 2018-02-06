import React from 'react';

import styles from './Footer.css';

const Footer = () => (
  <footer className={styles.Footer}>
    <a
      className={styles.FooterLink}
      target="_blank"
      rel="noreferrer noopener"
      href="https://github.com/romankrru/route-planner"
    >
      This project on Github
    </a>
  </footer>
);

export default Footer;
