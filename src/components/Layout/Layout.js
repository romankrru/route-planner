import React from 'react';
import PropTypes from 'prop-types';

import styles from './Layout.css';
import Header from './Header/Header';

const Layout = props => (
  <div className={styles.Layout}>
    <Header />
    <div className={styles.LayoutContent}>
      {props.children}
    </div>
  </div>
);

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
