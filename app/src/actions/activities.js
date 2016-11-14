import ApiService from '~/utils/ApiService';

export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';

export const addActivity = ({ activity, timestamp }) => ({
  type: ADD_ACTIVITY,
  activity,
  timestamp,
});

export const receiveActivities = activities => ({
  type: RECEIVE_ACTIVITIES,
  activities,
});

export const getActivities = () => dispatch =>
  ApiService.get(`/activities`)
  .then((res) => {
    dispatch(receiveActivities(res));
  });

