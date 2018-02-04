import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import Sidebar from './components/Sidebar/Sidebar';
import Map from './components/Map/Map';

class App extends Component {
  render() {
    return (
      <Layout>
        <Sidebar>
          sidebar
        </Sidebar>
        <Map />
      </Layout>
    );
  }
};

export default App;
