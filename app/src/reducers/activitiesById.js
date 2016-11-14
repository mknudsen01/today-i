import * as actions from '~/actions/activities';
import StorageService from '~/utils/StorageService';

const defaultState = StorageService.get('activityById') || {};
const activitiesById = (state = defaultState, action) => {
  switch (action.type) {
    case actions.ADD_ACTIVITY: {
      const activities = state[action.timestamp] || [];
      return Object.assign({}, state, {
        [action.timestamp]: [...activities, action.activity],
      });
    }
    case actions.RECEIVE_ACTIVITIES: {
      const nextState = { ...state };
      action.activities.forEach((activity) => {
        nextState[activity.id] = activity;
      });
      return nextState;
    }
    default:
      return state;
  }
};

export default activitiesById;

export const getActivity = (state, id) => state[id];
