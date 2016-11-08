import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '~/reducers';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    // Add other middleware on this line...
    applyMiddleware(thunk, createLogger({ collapsed: true, timestamp: false })),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
