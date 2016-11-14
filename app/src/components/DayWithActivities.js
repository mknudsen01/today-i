import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


function DayWithActivities(props) {
  const { day, activities } = props;
  const datestring = moment(parseInt(day)).format('MMMM DD, YYYY');
  const activityItems = activities.map(activity =>
    <div>{activity.text}</div>
  );
  return (
    <div>
      <h3>{datestring}</h3>
      {activityItems}
    </div>
  );
}

DayWithActivities.propTypes = {
  day: PropTypes.string.isRequired,
  activities: PropTypes.array.isRequired,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayWithActivities);

