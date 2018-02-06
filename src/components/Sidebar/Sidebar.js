import React from 'react';
import PropTypes from 'prop-types';

import styles from './Sidebar.css';

const Sidebar = props => (
  <div className={styles.Sidebar}>
    {props.children}
  </div>
);

Sidebar.defaultProps = {
  children: null,
};

Sidebar.propTypes = {
  children: PropTypes.node,
};

export default Sidebar;
