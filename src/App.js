import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import Sidebar from './components/Sidebar/Sidebar';
import Map from './components/Map/Map';
import SearchBox from './components/SearchBox/SearchBox';
import Places from './components/Places/Places';

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

  isPlaceInStateAllready = (newPlace) => (
    this.state.places
      .some(place => place.place_id === newPlace.place_id)
  )

  render() {
    return (
      <Layout>
        <Sidebar>
          <SearchBox
            onPlacesChanged={this.onPlacesChanged}
          />
          <Places places={this.state.places} />
        </Sidebar>
        <Map places={this.state.places} />
      </Layout>
    );
  }
};

export default App;
