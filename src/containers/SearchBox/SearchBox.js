import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

import { GOOGLE_MAPS_URL } from '../../constants';
import TextInput from '../../components/TextInput/TextInput';

class SearchBox extends Component {
  state = {
    searchTerm: '',
  }

  onSearchTermChange = (newTerm) => {
    this.setState({
      searchTerm: newTerm,
    });
  }

  render() {
    return (
      <div data-standalone-searchbox="">
        <StandaloneSearchBox
          ref={(input) => this.searchInput = input}
          bounds={this.props.bounds}
          onPlacesChanged={() => {
            this.props.onPlacesChanged(this.searchInput);
            this.setState({
              searchTerm: '',
            });
          }}
        >
          <TextInput
            value={this.state.searchTerm}
            onChange={this.onSearchTermChange}
          />
        </StandaloneSearchBox>
      </div>
    );
  }
}

const EnhancedSearchBox = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  withScriptjs
)(SearchBox);

export default EnhancedSearchBox;
