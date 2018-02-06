import React from 'react';

import styles from './Card.css';

const Card = (props) => {
  return (
    <li className={styles.Card}>
      <div className={styles.CardName}>
        {props.children}
      </div>
      <div
        className={styles.CardDelete}
        onClick={props.onCardDelete}
      >
        DELETE
      </div>
    </li>
  )
}

export default Card;