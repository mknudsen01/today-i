import React, { PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/Home';
import ActivityPage from './components/ActivityPage';

const getRoutes = () =>
  (
    <Route path="/" component={App} >
      <IndexRoute component={HomePage} />
      <Route path="activities" component={ActivityPage} />
    </Route>
  );

getRoutes.proptypes = {
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
};

export default getRoutes;
