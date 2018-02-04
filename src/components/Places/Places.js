import React from 'react';

import styles from './Places.css';
import Place from './Place/Place';

const Places = (props) => {
  console.log(props.places)
  const places = props.places.map((place) => {
    return (
      <Place
        key={place.place_id}
      >
        {place.formatted_address}
      </Place>
    );
  })
  
  return (
    <ul className={styles.Places}>
      {places}
    </ul>
  );
};

export default Places;