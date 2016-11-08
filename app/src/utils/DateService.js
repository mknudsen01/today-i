import moment from 'moment';

const DateService = () => {
  const getToday = () => moment();
  const toTime = date => moment(date).unix();
  const todayUnix = () => moment().startOf('day').unix();

  return {
    getToday,
    toTime,
    todayUnix,
  };
};

export default new DateService();
