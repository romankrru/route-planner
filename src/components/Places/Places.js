import React from 'react';

import styles from './Places.css';
import Place from './Place/Place';

const Places = (props) => {
  const places = props.places.map((place) => {
    return (
      <Place
        key={place.place_id}
        onPlaceDelete={props.onPlaceDelete.bind(null, place.place_id)}
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