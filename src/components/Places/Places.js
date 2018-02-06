import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import styles from './Places.css';
import Place from './Place/Place';

// this component should be Class based
// because I need Ref for drag and drop context
class Places extends Component {
  convertIndexToLetter = (index) => {
    return String.fromCharCode(65 + index);
  }

  render() {
    const places = this.props.places.map((place, i) => {
      return (
        <Place
          key={place.place_id}
          id={place.place_id}
          index={i}
          letterIndex={this.convertIndexToLetter(i)}
          onPlaceDelete={() => this.props.onPlaceDelete(place.place_id)}
          onPlaceMove={this.props.onPlaceMove}
        >
          {place.formatted_address}
        </Place>
      );
    });

    return (
      <ul className={styles.Places}>
        {places}
      </ul>
    );
  }
}

export default DragDropContext(HTML5Backend)(Places);
