import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import Sidebar from './components/Sidebar/Sidebar';

class App extends Component {
  render() {
    return (
      <Layout>
        <Sidebar>
          sidebar
        </Sidebar>
        {/* <Map /> */}
      </Layout>
    );
  }
};

export default App;
