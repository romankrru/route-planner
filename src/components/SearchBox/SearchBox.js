import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

import { GOOGLE_MAPS_URL } from '../../constants';

const SearchBox = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  withScriptjs
)(props => {
  let searchInput = null;

  return (
    <div data-standalone-searchbox="">
      <StandaloneSearchBox
        ref={(input) => searchInput = input}
        bounds={props.bounds}
        onPlacesChanged={() => props.onPlacesChanged(searchInput)}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </StandaloneSearchBox>
    </div>
  )
});

export default SearchBox;
