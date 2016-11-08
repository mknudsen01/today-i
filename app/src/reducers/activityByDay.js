import * as actions from '~/actions/activities';

import StorageService from '~/utils/StorageService';

const defaultState = StorageService.get('activityByDay') || {};
console.log('defaultState: ', defaultState);
const agentState = (state = defaultState, action) => {
  switch (action.type) {
    case actions.ADD_ACTIVITY: {
      const activities = state[action.timestamp] || [];
      return Object.assign({}, state, {
        [action.timestamp]: [...activities, action.activity],
      });
    }
    default:
      return state;
  }
};

export default agentState;
