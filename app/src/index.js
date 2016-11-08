import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import getRoutes from '~/routes';
import configureStore from '~/store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';
import '~/styles/main.css';

require('~/favicon.ico'); // Tell webpack to load favicon.ico

const store = configureStore.default() || {};
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={getRoutes(store)} store={store} />
  </Provider>, document.getElementById('app')
);

export const dispatch = store.dispatch;
export const getState = store.getState;
