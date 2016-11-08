import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


function ActivityItem(props) {
  const { timestamp, activities = [] } = props;
  const datestring = moment(parseInt(timestamp), 'X').format('MMMM DD, YYYY');
  return (
    <div className="grid">
      <h3 className="grid__item grid__item--1-1">{datestring}</h3>
      {
        activities.map(activity =>
          <p className="grid__item grid__item--1-1">{activity}</p>
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

