import React from 'react';

import styles from './Place.css';

const Place = (props) => {
  return (
    <li className={styles.Place}>
      <div className={styles.PlaceName}>
        {props.children}
      </div>
      <div
        className={styles.PlaceDelete}
        onClick={props.onPlaceDelete}
      >
        DELETE
      </div>
    </li>
  );
};

export default Place;