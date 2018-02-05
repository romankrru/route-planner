import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

import { GOOGLE_MAPS_URL } from '../../constants';
import styles from './SearchBox.css';

const SearchBox = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  withScriptjs
)(props => {
  let searchInput = null;
  let inputElement = null;

  return (
    <div data-standalone-searchbox="">
      <StandaloneSearchBox
        ref={(input) => searchInput = input}
        bounds={props.bounds}
        onPlacesChanged={() => {
          inputElement.value = '';
          props.onPlacesChanged(searchInput)
        }}
      >
        <input
          ref={input => inputElement = input}
          className={styles.SearchBox}
          type="text"
          placeholder="Type here"
        />
      </StandaloneSearchBox>
    </div>
  )
});

export default SearchBox;
