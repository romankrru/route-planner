import React from 'react';

import styles from './Cards.css';

const Cards = (props) => {
  return (
    <ul className={styles.Cards}>
      {props.children}
    </ul>
  );
};

export default Cards;