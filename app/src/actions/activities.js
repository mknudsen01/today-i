export const ADD_ACTIVITY = 'ADD_ACTIVITY';

export const addActivity = ({ activity, timestamp }) => ({
  type: ADD_ACTIVITY,
  activity,
  timestamp,
});
