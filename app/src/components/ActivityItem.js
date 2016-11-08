import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


function ActivityItem(props) {
  const { timestamp, activities = [] } = props;
  const datestring = moment(parseInt(timestamp), 'X').format('MMMM DD, YYYY');
  return (
    <div>
      <h3>{datestring}</h3>
      {
        activities.map(activity =>
          <div className="grid grid--center">{activity}</div>
        )
      }
    </div>
  );
}

ActivityItem.propTypes = {
  timestamp: PropTypes.string,
  activities: PropTypes.array,
};

function mapStateToProps() {
  return {
    data: PropTypes.object,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityItem);

