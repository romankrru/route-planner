import React from 'react';
import PropTypes from 'prop-types';

import styles from './Cards.css';

const Cards = props => (
  <ul className={styles.Cards}>
    {props.children}
  </ul>
);

Cards.defaultProps = {
  children: null,
};

Cards.propTypes = {
  children: PropTypes.node,
};

export default Cards;
