import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import ActivityItem from '~/components/ActivityItem';
import NewActivityForm from '~/containers/NewActivityForm';

import StorageService from '~/utils/StorageService';


function ActivityPage(props) {
  const { activityByDay } = props;

  // set the activities we're about to render to local storage
  StorageService.set('activityByDay', activityByDay);

  const items = Object.keys(activityByDay).map(timestamp =>
    <ActivityItem timestamp={timestamp} activities={activityByDay[timestamp]} />
  );
  return (
    <div className="grid mt">
      <Helmet title={`Activities`} />
      <div className="grid__item grid__item--1-1">
        <NewActivityForm />
      </div>
      <div className="grid__item grid__item--1-1">
        {items}
      </div>
    </div>
  );
}

ActivityPage.propTypes = {
  activityByDay: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    activityByDay: state.activityByDay,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityPage);
