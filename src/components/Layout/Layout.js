import React from 'react';

import styles from './Layout.css';
import Header from './Header/Header';

const Layout = (props) => {
  return (
    <div className={styles.Layout}>
      <Header />
      <div className={styles.LayoutContent}>
        {props.children}
      </div>
    </div>
  )
};

export default Layout;