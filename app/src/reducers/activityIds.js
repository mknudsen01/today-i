import _ from 'lodash';

import * as actions from '~/actions/activities';
import StorageService from '~/utils/StorageService';

const loadedActivities = StorageService.get('activityById') || {};
const ids = Object.keys(loadedActivities) || [];
const activityIds = (state = ids, action) => {
  switch (action.type) {
    case actions.ADD_ACTIVITY:
      return [...state, action.id];
    case actions.RECEIVE_ACTIVITIES: {
      return _.uniq([...state, ...action.activities.map(activity => activity.id)]);
    }
    default:
      return state;
  }
};

export default activityIds;

export const getIds = state => state;
