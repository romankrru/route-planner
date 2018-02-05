import React, { Component } from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

import mapStyleConfig from './style';
import { GOOGLE_MAPS_URL } from '../../constants';

// component to render base map
// will be enhaced with HOCs later
class BaseMap extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.places !== this.props.places &&
      nextProps.places.length !== 0
    ) {
      // fit markers to view 
      this.props.fitBounds(nextProps.places);
      this.props.renderDirections(nextProps.places);
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
        defaultZoom={10}
        defaultCenter={{ lat: 55.746382, lng: 37.617365 }}
        defaultOptions={{ styles: mapStyleConfig, disableDefaultUI: true }}
      >
        {/*markers*/}
        {this.props.directions && <DirectionsRenderer directions={this.props.directions} />}
      </GoogleMap>
    );
  }
}

// enhacing BaseMap comonent
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

          /* eslint-disable no-undef */
          const bounds = new google.maps.LatLngBounds();
          /* eslint-enable no-undef */

          places.forEach(place => {
            bounds.extend(place.geometry.location);
          });

          refs.map.fitBounds(bounds);
        }
      });
    },
    componentDidMount() {
      this.setState({
        renderDirections: (places) => {
          /* eslint-disable no-undef */
          const DirectionsService = new google.maps.DirectionsService();
          /* eslint-enable no-undef */

          const origin = places[0].geometry.location;
          const destination = places[places.length - 1].geometry.location;
          let waypoints = [];

          if (places.length > 2) {
            waypoints = places
              .slice(1, places.length - 1)
              .map(place => ({ location: place.geometry.location }));
          }
         
          DirectionsService.route({
            origin,
            destination,
            waypoints,
            /* eslint-disable no-undef */
            travelMode: google.maps.TravelMode.WALKING,
            /* eslint-enable no-undef */
          }, (result, status) => {
            /* eslint-disable no-undef */
            const okStatus = google.maps.DirectionsStatus.OK
            /* eslint-enable no-undef */

            if (status === okStatus) {
              this.setState({
                directions: result,
              });
            } else {
              console.error(`error fetching directions`);
              console.error(result);
            }
          });
        }
      })
    }
  }),
  withScriptjs,
  withGoogleMap
)(BaseMap);

export default Map;
