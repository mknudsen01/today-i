import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';


function ActivityItem(props) {
  const { activity = {} } = props;
  // const datestring = moment(parseInt(activity.time), 'X').format('MMMM DD, YYYY');
  return (
    <div className="grid">
      <div className="grid__item grid__item--1-2">
        {activity.time}
      </div>
      <div className="grid__item grid__item--1-2">
        {activity.text}
      </div>
    </div>
  );
}

ActivityItem.propTypes = {
  activity: PropTypes.object,
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
)(ActivityItem);

