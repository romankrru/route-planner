import React from 'react';

import styles from './Layout.css';

const Layout = (props) => {
  return (
    <div className={styles.Layout}>
      {props.children}
    </div>
  )
};

export default Layout;