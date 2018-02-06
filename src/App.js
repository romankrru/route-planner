import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import Sidebar from './components/Sidebar/Sidebar';
import Map from './containers/Map/Map';
import SearchBox from './containers/SearchBox/SearchBox';
import Places from './containers/Places/Places';

class App extends Component {
  state = {
    places: [],
  }

  onPlacesChanged = (search) => {
    const place = search.getPlaces()[0];

    if (place && !this.isPlaceInStateAllready(place)) {
      this.setState({
        places: [...this.state.places, place],
      });
    }
  }

  onPlaceDelete = (placeId) => {
    this.setState({
      places: this.state.places.filter(place => (
        place.place_id !== placeId
      )),
    });
  }

  // this function will be invoked
  // then place in sidebar dragged
  onPlaceMove = (dragIndex, hoverIndex) => {
    const newPlaces = [...this.state.places];
    newPlaces.splice(dragIndex, 0, newPlaces.splice(hoverIndex, 1)[0]);
    this.setState({
      places: newPlaces,
    });
  }

  isPlaceInStateAllready = newPlace => (
    this.state.places
      .some(place => place.place_id === newPlace.place_id)
  )

  updatePlacesAfterMarkerDragged = (newPlace, index) => {
    const { places } = this.state;

    const newPlaces = [
      ...places.slice(0, index),
      newPlace,
      ...places.slice(index + 1),
    ];

    this.setState({
      places: newPlaces,
    });
  }

  render() {
    return (
      <Layout>
        <Sidebar>
          <SearchBox onPlacesChanged={this.onPlacesChanged} />
          <Places
            places={this.state.places}
            onPlaceDelete={this.onPlaceDelete}
            onPlaceMove={this.onPlaceMove}
          />
        </Sidebar>
        <Map
          places={this.state.places}
          updatePlacesAfterMarkerDragged={this.updatePlacesAfterMarkerDragged}
        />
      </Layout>
    );
  }
}

export default App;
