import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Header from '~/components/Header';

function App(props) {
  return (
    <div>
      <Helmet title="Today I" titleTemplate="%s - Today I" />
      <Header />
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(App);
