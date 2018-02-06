import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Cards from '../../components/Cards/Cards';
import Place from '../Place/Place';

class Places extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.any).isRequired,
    onPlaceDelete: PropTypes.func.isRequired,
    onPlaceMove: PropTypes.func.isRequired,
  }

  convertIndexToLetter = index => String.fromCharCode(65 + index)

  render() {
    const places = this.props.places.map((place, i) => (
      <Place
        key={place.place_id}
        id={place.place_id}
        index={i}
        onPlaceDelete={() => this.props.onPlaceDelete(place.place_id)}
        onPlaceMove={this.props.onPlaceMove}
      >
        {`${this.convertIndexToLetter(i)}: ${place.formatted_address}`}
      </Place>
    ));

    return (
      <Cards>
        {places}
      </Cards>
    );
  }
}

export default DragDropContext(HTML5Backend)(Places);
