import React from 'react';
import PropTypes from 'prop-types';

import styles from './Card.css';

const Card = props => (
  <div className={styles.Card}>
    <div className={styles.CardName}>
      {props.children}
    </div>
    <button
      className={styles.CardDelete}
      onClick={props.onCardDelete}
    >
        DELETE
    </button>
  </div>
);

Card.defaultProps = {
  children: null,
};

Card.propTypes = {
  children: PropTypes.node,
  onCardDelete: PropTypes.func.isRequired,
};

export default Card;
