import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import moment from 'moment';

import activitiesById, * as fromById from './activitiesById';
import activityIds, * as fromIds from './activityIds';

const rootReducer = combineReducers({
  routing: routerReducer,
  activitiesById,
  activityIds,
});

export default rootReducer;

export const getAllActivities = (state) => {
  const ids = fromIds.getIds(state.activityIds);
  return ids.map(id => fromById.getActivity(state.activitiesById, id));
};

export const getActivitiesByDay = (state) => {
  const activitiesByDay = {};
  const activities = state.activitiesById;
  Object.keys(state.activitiesById).forEach((id) => {
    const activity = activities[id] || {};
    const day = moment(activity.time)
      .startOf('day')
      .format('x');
    if (activitiesByDay[day]) {
      activitiesByDay[day].push(activity);
    } else {
      activitiesByDay[day] = [activity];
    }
  });
  return activitiesByDay;
};
