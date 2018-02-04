import React, { Component } from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import { GOOGLE_MAPS_URL } from '../../constants';

class BaseMap extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.places !== this.props.places) {
      // fit all markers to view 
      this.props.fitBounds(nextProps.places);
    }
  }

  render() {
    const markers = this.props.places.map(place => {
      const { location } = place.geometry;

      return (
        <Marker
          key={place.place_id}
          position={{ lat: location.lat(), lng: location.lng() }}
        />
      );
    });

    return (
      <GoogleMap
        ref={this.props.onMapMounted}
        defaultZoom={8}
        defaultCenter={{ lat: 55.746382, lng: 37.617365 }}
      >
        {markers}
      </GoogleMap>
    );
  }
}

const Map = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%', width: '70%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        onMapMounted: ref => {
          refs.map = ref;
        },
        fitBounds: (places) => {
          if (!refs.map) {
            return;
          }

          /* eslint-disable no-undef*/
          const bounds = new google.maps.LatLngBounds();
          /* eslint-enable no-undef*/

          places.forEach(place => {
            bounds.extend(place.geometry.location)
          })

          refs.map.fitBounds(bounds);
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(BaseMap);

export default Map;
