import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import activityByDay from './activityByDay';

const rootReducer = combineReducers({
  routing: routerReducer,
  activityByDay,
});

export default rootReducer;
