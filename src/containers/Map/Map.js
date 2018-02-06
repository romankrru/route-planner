import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps';

import mapStyleConfig from './styleConfig';
import { GOOGLE_MAPS_URL } from '../../constants';

// component to render base map,
// will be enhaced with HOCs later
class BaseMap extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.any).isRequired,
    renderDirections: PropTypes.func.isRequired,
    fitBounds: PropTypes.func.isRequired,
    directions: PropTypes.objectOf(PropTypes.any),
    onDirectionsRendererMounted: PropTypes.func.isRequired,
    onDirectionsChanged: PropTypes.func.isRequired,
    updatePlacesAfterMarkerDragged: PropTypes.func.isRequired,
    onMapMounted: PropTypes.func.isRequired,
  }

  static defaultProps = {
    directions: undefined,
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.places !== this.props.places &&
      nextProps.places.length !== 0
    ) {
      this.props.renderDirections(nextProps.places);

      if (nextProps.places.length !== this.props.places.length) {
        // fit markers to view on new waypoint add
        this.props.fitBounds(nextProps.places);
      }
    }
  }

  render() {
    let directions = null;

    // render routes directions only if
    // user submited more then 1 places
    // if not - render a simple marker
    if (this.props.places.length === 1) {
      const [place] = this.props.places;
      const { location } = place.geometry;

      directions = (
        <Marker
          key={place.place_id}
          position={{
            lat: location.lat(),
            lng: location.lng(),
          }}
        />
      );
    } else if (this.props.directions) {
      directions = (
        <DirectionsRenderer
          ref={this.props.onDirectionsRendererMounted}
          onDirectionsChanged={() => {
              this.props.onDirectionsChanged()
                .then(([geocodedData, index, newDirections]) => {
                  const currentDirectionsCount = this.props.directions.geocoded_waypoints.length;
                  const newDirectionsCount = newDirections.geocoded_waypoints.length;

                  // if condition below is true this means user trying to
                  // create a new intermediate waypoint by dragging point
                  // on rendered direction path and I'm not going to handle this case
                  if (newDirectionsCount > currentDirectionsCount) {
                    return;
                  }

                  // if condition is false this means user drags an exising
                  // marker and corresponding place in state should be updated
                  this.props.updatePlacesAfterMarkerDragged(geocodedData, index);
                });
            }}
          options={{ draggable: true }}
          directions={this.props.directions}
        />
      );
    }

    return (
      <GoogleMap
        ref={this.props.onMapMounted}
        defaultZoom={10}
        defaultCenter={{ lat: 55.746382, lng: 37.617365 }}
        defaultOptions={{ styles: mapStyleConfig, disableDefaultUI: true }}
      >
        {directions}
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
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onDirectionsRendererMounted: (ref) => {
          refs.directionsRenderer = ref;
        },
        onDirectionsChanged: () => {
          // this function will be invoked then user drags an existing marker or
          // creates new waypoint by dragging point on direction path
          // it will return promise which resolves with an array:
          // 1st element - information about place under the marker,
          // 2nd element - index of dragged marker (marker A has 0 index, marker B - 1 and so on...)
          // 3rd - object with new directions
          if (!refs.directionsRenderer) {
            return undefined;
          }

          const geocoder = new google.maps.Geocoder();

          const newDirections = refs.directionsRenderer.getDirections();
          const draggedMarkerIndex = newDirections.request.ac;
          const newPlaceId = newDirections.geocoded_waypoints[draggedMarkerIndex].place_id;

          return new Promise((resolve) => {
            geocoder.geocode({
              placeId: newPlaceId,
            }, (result) => {
              resolve([result[0], draggedMarkerIndex, newDirections]);
            });
          });
        },
        fitBounds: (places) => {
          if (!refs.map) {
            return;
          }

          const bounds = new google.maps.LatLngBounds();

          places.forEach((place) => {
            bounds.extend(place.geometry.location);
          });

          refs.map.fitBounds(bounds);
        },
      });
    },
    componentDidMount() {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({
      /* eslint-enable react/no-did-mount-set-state */
        renderDirections: (places) => {
          const DirectionsService = new google.maps.DirectionsService();

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
            travelMode: google.maps.TravelMode.WALKING,
          }, (result, status) => {
            const okStatus = google.maps.DirectionsStatus.OK;

            if (status === okStatus) {
              this.setState({
                directions: result,
              });
            } else {
              alert(`Could not display directions due to: ${status}`);
            }
          });
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)(BaseMap);

export default Map;
